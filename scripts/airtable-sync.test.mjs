// Self-check for the Airtable field mapping. Run: node scripts/airtable-sync.test.mjs
// Attachment kinds hit the network, so they are left to the real sync.
import assert from 'node:assert/strict';
import { read, toRows } from './airtable-sync.mjs';

const people = new Map([
  ['recA', 'Arramel, Ph.D.'],
  ['recB', 'Dummy Researcher One'],
]);

assert.deepEqual(await read(['a', 'b'], 'list'), ['a', 'b']);
assert.deepEqual(await read(undefined, 'list'), []);
assert.deepEqual(await read('- one\n\n* two ', 'lines'), ['one', 'two']);
assert.equal(await read(undefined), '');
assert.equal(await read(2026), '2026');
assert.equal(await read(['recA'], 'person', { people }), 'Arramel, Ph.D.');
assert.equal(await read(undefined, 'person', { people }), '');
assert.deepEqual(await read(['recB', 'recGone'], 'people', { people }), [
  'Dummy Researcher One',
]);

const fields = { title: ['Title'], tags: ['Tags', 'list'] };

const rows = await toRows(
  [
    { id: 'r2', fields: { Title: 'Second', Order: 2, Tags: ['x'], Published: true } },
    { id: 'r0', fields: { Title: 'Explicit draft', Order: 0, Published: false } },
    // Airtable leaves an unticked checkbox out of the payload entirely.
    { id: 'r8', fields: { Title: 'Implicit draft', Order: 8 } },
    { id: 'r1', fields: { Title: 'First', Order: 1, Published: true } },
    { id: 'r9', fields: { Title: 'No order', Published: true } },
  ],
  fields,
);

assert.deepEqual(
  rows,
  [
    { id: 'r1', title: 'First', tags: [] },
    { id: 'r2', title: 'Second', tags: ['x'] },
    { id: 'r9', title: 'No order', tags: [] },
  ],
  'drafts drop out, Order sorts, unset fields get empty values',
);

const slugged = await toRows(
  [
    { id: 'r1', fields: { Title: 'Surface Science', Order: 1, Published: true } },
    { id: 'r2', fields: { Title: 'Surface science!', Order: 2, Published: true } },
    { id: 'r3', fields: { Title: '???', Order: 3, Published: true } },
  ],
  { title: ['Title'] },
  { slugFrom: 'title' },
);

assert.deepEqual(
  slugged.map((row) => row.slug),
  ['surface-science', 'surface-science-2', 'r3'],
  'slugs come from the title, stay unique, and fall back to the record id',
);

console.log('airtable-sync: ok');
