# apcresearch.org

Vite + React 18 + Tailwind v4 single-page site. No backend, no tests, no server
code. Static files only.

## Commands

- `pnpm i` install
- `pnpm dev` dev server
- `pnpm build` production build into `dist/`
- `pnpm typecheck` type check (no tests in this repo)

## Routing

`src/app/App.tsx` holds `PAGES`, the single route table: one entry per page with
its `path`, document `title` and `render`. To add a page, add the key to
`PageType` in `src/app/types/navigation.ts` and one entry to `PAGES`. Nothing
else needs editing. `pnpm typecheck` fails if the two disagree.

`Navigation.tsx` keeps its own `navItems`. An item has either `page` (routes
inside the app) or `href` (links out), never both.

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
Pages, serving `apcresearch.org` (see `CNAME`).

## Notes

- `src/app/components/ui/` is an unused shadcn/ui dump. No app code imports it.
- `.legacy/` is the pre-React site, kept for reference only.
