# Website repository for apcresearch.org.

## Running the code

Run `pnpm i` to install the dependencies.

Run `pnpm dev` to start the development server.

## Deploying to GitHub Pages

One-time: repo **Settings → Pages → Source: GitHub Actions**.

Every push to `main` then builds and deploys via `.github/workflows/deploy.yml`.
The base path comes from `actions/configure-pages`, so the same build works on
`<org>.github.io/<repo>/` and on a custom domain (set it under Settings → Pages).
