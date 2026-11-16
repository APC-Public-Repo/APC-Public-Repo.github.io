// Pulls the CMS tables out of Airtable and writes src/content/*.json, which
// the pages import directly. Content is therefore baked into the bundle at
// build time: no API key ships to the browser and no request happens when a
// visitor loads the page. An Airtable edit becomes live on the next build.
//
// Attachments are downloaded into public/cms/ during the same run, because an
// Airtable attachment URL expires a couple of hours after it is handed out.
// The JSON stores the local path, so the images keep working.
//
// Needs AIRTABLE_TOKEN (personal access token, data.records:read on the base)
// and AIRTABLE_BASE_ID. Without them the script leaves the committed JSON
// alone, so local dev and a build with no secrets both still work. On CI it
// also exits 1, because there a missing secret means the deploy just shipped
// stale placeholder content to visitors.
//
// Run it with: node scripts/airtable-sync.mjs

import { mkdir, rm, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

const ASSET_DIR = new URL('../public/cms/', import.meta.url);

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
      photo: ['Photo', 'image'],
      bio: ['Bio'],
      email: ['Email'],
      scholar: ['Scholar'],
      linkedin: ['LinkedIn'],
      orcid: ['ORCID'],
    },
  },
  {
    file: 'patents',
    table: 'Patents',
    fields: {
      title: ['Judul Invensi'],
      applicationNumber: ['Nomor Permohonan'],
      patentNumber: ['Nomor Paten'],
      filingDate: ['Tanggal Penerimaan'],
      publicationDate: ['Tanggal Publikasi'],
      inventors: ['Inventor', 'lines'],
      holder: ['Pemegang Paten'],
      type: ['Jenis Paten'],
      status: ['Status'],
      ipc: ['Klasifikasi IPC'],
      abstract: ['Abstrak'],
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
  {
    file: 'research',
    table: 'Research Interests',
    fields: {
      title: ['Title'],
      summary: ['Summary'],
      body: ['Body'],
      headline: ['Headline Image', 'image'],
      attachments: ['Attachments', 'files'],
      lead: ['Lead', 'person'],
      members: ['Members', 'people'],
    },
    // Detail pages live at /research/<slug>, derived from the title.
    slugFrom: 'title',
  },
];

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// An Airtable attachment URL dies after a couple of hours, so keep the file.
async function saveAttachment(attachment) {
  const response = await fetch(attachment.url);

  if (!response.ok) {
    throw new Error(`attachment ${attachment.filename} responded ${response.status}`);
  }

  const name = attachment.id + (extname(attachment.filename ?? '') || '.bin');
  await writeFile(
    new URL(name, ASSET_DIR),
    Buffer.from(await response.arrayBuffer()),
  );

  // Relative on purpose: the pages prefix it with import.meta.env.BASE_URL.
  return `cms/${name}`;
}

export async function read(value, kind, context = {}) {
  const names = context.people ?? new Map();

  switch (kind) {
    case 'image':
      return Array.isArray(value) && value[0] ? saveAttachment(value[0]) : '';
    case 'files':
      return Array.isArray(value)
        ? Promise.all(
            value.map(async (attachment) => ({
              name: attachment.filename ?? '',
              path: await saveAttachment(attachment),
            })),
          )
        : [];
    // Linked records arrive as record ids, so swap them for People names.
    case 'person':
      return Array.isArray(value) ? (names.get(value[0]) ?? '') : '';
    case 'people':
      return Array.isArray(value)
        ? value.map((id) => names.get(id) ?? '').filter(Boolean)
        : [];
    case 'list':
      return Array.isArray(value) ? value.map(String) : [];
    // One item per line in an Airtable long-text field.
    case 'lines':
      return String(value ?? '')
        .split('\n')
        .map((line) => line.replace(/^[-*\s]+/, '').trim())
        .filter(Boolean);
    default:
      return value == null ? '' : String(value);
  }
}

export async function toRows(records, fields, options = {}) {
  const published = records
    // Airtable omits an unticked checkbox from the API response, so a row
    // counts as published only when Published comes back as true.
    .filter((record) => record.fields.Published === true)
    .sort(
      (a, b) => (a.fields.Order ?? Infinity) - (b.fields.Order ?? Infinity),
    );

  const rows = [];

  for (const record of published) {
    const row = { id: record.id };

    for (const [key, [field, kind]] of Object.entries(fields)) {
      row[key] = await read(record.fields[field], kind, options);
    }

    if (options.slugFrom) {
      const base = slugify(row[options.slugFrom]) || record.id;
      let slug = base;

      // Two rows with the same title would otherwise share one URL.
      for (let n = 2; rows.some((other) => other.slug === slug); n += 1) {
        slug = `${base}-${n}`;
      }

      row.slug = slug;
    }

    rows.push(row);
  }

  return rows;
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

// Only run when invoked directly. The self-check imports the helpers above.
if (process.argv[1]?.endsWith('airtable-sync.mjs')) {
  if (!TOKEN || !BASE_ID) {
    const missing = [
      !TOKEN && 'AIRTABLE_TOKEN',
      !BASE_ID && 'AIRTABLE_BASE_ID',
    ]
      .filter(Boolean)
      .join(' and ');

    // Locally that is normal: dev and a contributor's build both run without
    // secrets and want the committed JSON. On CI it means the live site is
    // serving stale content, so say so loudly instead of exiting green.
    if (process.env.CI) {
      console.error(
        `${missing} missing. Set the repository Actions secrets; the build is shipping the committed src/content/*.json.`,
      );
      process.exit(1);
    }

    console.log(`${missing} missing. Keeping the committed src/content/*.json.`);
    process.exit(0);
  }

  // Stale files would pile up run after run, so start the asset folder empty.
  await rm(ASSET_DIR, { recursive: true, force: true });
  await mkdir(ASSET_DIR, { recursive: true });

  let failed = false;

  // Research interests point at People rows, so the names have to exist first.
  const people = new Map();

  try {
    for (const record of await fetchRecords('People')) {
      people.set(record.id, String(record.fields.Name ?? ''));
    }
  } catch (error) {
    failed = true;
    console.error(`People lookup unavailable: ${error.message}`);
  }

  for (const { file, table, fields, slugFrom } of TABLES) {
    try {
      const rows = await toRows(await fetchRecords(table), fields, {
        people,
        slugFrom,
      });

      await writeFile(
        new URL(`../src/content/${file}.json`, import.meta.url),
        JSON.stringify(rows, null, 2) + '\n',
      );

      console.log(`${file}.json: ${rows.length} rows from "${table}"`);
    } catch (error) {
      // Keep the committed JSON rather than publishing an empty page, but make
      // the CI step go red so a renamed column cannot rot unnoticed.
      failed = true;
      console.error(`${file}.json left unchanged: ${error.message}`);
    }
  }

  process.exit(failed ? 1 : 0);
}
