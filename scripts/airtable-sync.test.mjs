// Self-check for the Airtable field mapping. Run: node scripts/airtable-sync.test.mjs
import assert from 'node:assert/strict';
import { read, toRows } from './airtable-sync.mjs';

assert.equal(read([{ url: 'https://x/p.jpg' }], 'attachment'), 'https://x/p.jpg');
assert.equal(read(undefined, 'attachment'), '');
assert.deepEqual(read(['a', 'b'], 'list'), ['a', 'b']);
assert.deepEqual(read(undefined, 'list'), []);
assert.deepEqual(read('- one\n\n* two ', 'lines'), ['one', 'two']);
assert.equal(read(undefined), '');
assert.equal(read(2026), '2026');

const fields = { title: ['Title'], tags: ['Tags', 'list'] };

const rows = toRows(
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

console.log('airtable-sync: ok');
