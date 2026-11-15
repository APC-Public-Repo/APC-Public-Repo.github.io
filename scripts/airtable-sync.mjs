// Pulls the CMS tables out of Airtable and writes src/content/*.json, which
// the pages import directly. Content is therefore baked into the bundle at
// build time: no API key ships to the browser and no request happens when a
// visitor loads the page. An Airtable edit becomes live on the next build.
//
// Needs AIRTABLE_TOKEN (personal access token, data.records:read on the base)
// and AIRTABLE_BASE_ID. Without them the script leaves the committed JSON
// alone, so local dev and a build with no secrets both still work.
//
// Run it with: node scripts/airtable-sync.mjs

import { writeFile } from 'node:fs/promises';

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

// jsonKey: [Airtable field name, kind]. 'text' is the default kind and may be
// omitted. Renaming a column in Airtable means renaming it here too.
const TABLES = [
  {
    file: 'people',
    table: 'People',
    fields: {
      name: ['Name'],
      role: ['Role'],
      group: ['Group'],
      affiliation: ['Affiliation'],
      photo: ['Photo', 'attachment'],
      bio: ['Bio'],
      email: ['Email'],
      scholar: ['Scholar'],
      linkedin: ['LinkedIn'],
      orcid: ['ORCID'],
    },
  },
  {
    file: 'portfolio',
    table: 'Portfolio',
    fields: {
      title: ['Title'],
      summary: ['Summary'],
      category: ['Category'],
      status: ['Status'],
      year: ['Year'],
      image: ['Image', 'attachment'],
      link: ['Link'],
      tags: ['Tags', 'list'],
    },
  },
  {
    file: 'openings',
    table: 'Openings',
    fields: {
      title: ['Title'],
      type: ['Type'],
      location: ['Location'],
      deadline: ['Deadline'],
      summary: ['Summary'],
      requirements: ['Requirements', 'lines'],
      applyUrl: ['Apply URL'],
    },
  },
];

export function read(value, kind) {
  switch (kind) {
    // Attachment fields arrive as an array of objects; the page wants one URL.
    case 'attachment':
      return Array.isArray(value) ? (value[0]?.url ?? '') : '';
    case 'list':
      return Array.isArray(value) ? value.map(String) : [];
    // One requirement per line in an Airtable long-text field.
    case 'lines':
      return String(value ?? '')
        .split('\n')
        .map((line) => line.replace(/^[-*\s]+/, '').trim())
        .filter(Boolean);
    default:
      return value == null ? '' : String(value);
  }
}

async function fetchRecords(table) {
  const records = [];
  let offset;

  do {
    const url = new URL(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}`,
    );
    url.searchParams.set('pageSize', '100');
    if (offset) url.searchParams.set('offset', offset);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!response.ok) {
      throw new Error(
        `Airtable responded ${response.status} for table "${table}": ${await response.text()}`,
      );
    }

    const page = await response.json();
    records.push(...page.records);
    offset = page.offset;
  } while (offset);

  return records;
}

export function toRows(records, fields) {
  return records
    // Airtable omits an unticked checkbox from the API response, so a row
    // counts as published only when Published comes back as true.
    .filter((record) => record.fields.Published === true)
    .sort(
      (a, b) => (a.fields.Order ?? Infinity) - (b.fields.Order ?? Infinity),
    )
    .map((record) => {
      const row = { id: record.id };
      for (const [key, [field, kind]] of Object.entries(fields)) {
        row[key] = read(record.fields[field], kind);
      }
      return row;
    });
}

async function sync({ file, table, fields }) {
  const rows = toRows(await fetchRecords(table), fields);

  await writeFile(
    new URL(`../src/content/${file}.json`, import.meta.url),
    JSON.stringify(rows, null, 2) + '\n',
  );

  console.log(`${file}.json: ${rows.length} rows from "${table}"`);
}

// Only run when invoked directly. The self-check imports the helpers above.
if (process.argv[1]?.endsWith('airtable-sync.mjs')) {
  if (!TOKEN || !BASE_ID) {
    console.log(
      'AIRTABLE_TOKEN or AIRTABLE_BASE_ID missing. Keeping the committed src/content/*.json.',
    );
    process.exit(0);
  }

  let failed = false;

  for (const config of TABLES) {
    try {
      await sync(config);
    } catch (error) {
      // Keep the committed JSON rather than publishing an empty page, but make
      // the CI step go red so a renamed column cannot rot unnoticed.
      failed = true;
      console.error(`${config.file}.json left unchanged: ${error.message}`);
    }
  }

  process.exit(failed ? 1 : 0);
}
