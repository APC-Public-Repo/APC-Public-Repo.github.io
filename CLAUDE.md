# apcresearch.org

Vite + React 18 + Tailwind v4 single-page site. No backend, no tests, no server
code. Static files only.

## Commands

- `pnpm i` install
- `pnpm dev` dev server
- `pnpm build` production build into `dist/`
- `pnpm typecheck` type check
- `pnpm cms` pull Airtable into `src/content/*.json` (needs the two env vars)
- `node scripts/airtable-sync.test.mjs` self-check for the Airtable mapping

## Routing

`src/app/App.tsx` holds `PAGES`, the single route table: one entry per page with
its `path`, document `title` and `render`. To add a page, add the key to
`PageType` in `src/app/types/navigation.ts` and one entry to `PAGES`. Nothing
else needs editing. `pnpm typecheck` fails if the two disagree.

`Navigation.tsx` keeps its own `navItems`. An item has either `page` (routes
inside the app) or `href` (links out), never both.

## CMS (Airtable)

`/people`, `/portfolio` and `/openings` render from `src/content/*.json`, which
the pages import directly. `scripts/airtable-sync.mjs` rewrites those files from
Airtable at build time, so the content is baked into the bundle: no API token
reaches the browser and no request happens when a visitor loads the page. The
committed JSON is the fallback, and it currently holds dummy rows.

An Airtable edit goes live on the next build. The workflow builds on push, every
hour on a schedule, on manual dispatch, and on a `repository_dispatch` with
`event_type: airtable` (which an Airtable automation can POST).

The live base is `APC Website CMS` (`app0uHCWdoNYmSmlX`) in the `APC Content
Management System` workspace, seeded with placeholder rows.

Secrets live in the repo's Actions secrets: `AIRTABLE_TOKEN` (a personal access
token with `data.records:read` on the base) and `AIRTABLE_BASE_ID`. Without them
the script leaves the committed JSON alone and exits 0.

Column names are mapped in the `TABLES` constant of the script, and the row
shapes are typed in `src/app/types/content.ts`. Renaming a column in Airtable
means renaming it in both places. Every table also reads two shared columns:
`Published` (checkbox; a row publishes only when it is ticked, because Airtable
leaves an unticked checkbox out of its API response) and `Order` (number; sorts
ascending, blanks last).

| Table | Columns |
| --- | --- |
| `People` | Name, Role, Group (`PI`/`Team`/`Intern`/`Alumni`), Affiliation, Photo (attachment), Bio, Email, Scholar, LinkedIn, ORCID |
| `Portfolio` | Title, Summary, Category, Status, Year, Image (attachment), Link, Tags (multi-select) |
| `Openings` | Title, Type, Location, Deadline, Summary, Requirements (long text, one per line), Apply URL |

## State

Async work uses one explicit status value, never a pair of booleans:
`WhatsNewSection` (`FeedState`), `PublicationsPage` (`status` + `attempt`),
`ContactPage` (`'editing' | 'handedOff'`).

## External dependencies at runtime

- Substack feed via api.rss2json.com (`WhatsNewSection`)
- BibBase iframe (`PublicationsPage`)
- Citation numbers in `PublicationsStats.tsx` are hand-entered from Google
  Scholar, not fetched
- The contact form opens a `mailto:` draft; there is nothing to POST to

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub
Pages, serving `apcresearch.org` (see `CNAME`). `vercel.json` is left over from
a Vercel setup and does not affect the live site.

## Notes

- `src/app/components/ui/` is an unused shadcn/ui dump. No app code imports it.
- `.legacy/` is the pre-React site, kept for reference only.
