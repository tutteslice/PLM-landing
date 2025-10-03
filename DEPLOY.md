# Deployment & Local Testing — Cloudflare Pages

This repository has been migrated from Netlify Functions to Cloudflare Pages Functions.

Below are instructions to run the project locally (Pages Functions) and to deploy to Cloudflare Pages.

Prerequisites
- Node.js (16+ or current LTS)
- npm or yarn
- Install Wrangler (Cloudflare CLI):

  npm install -g wrangler

Local development (Pages Functions)
1. Install dependencies in the project root (if you use Yarn or npm):

  npm install

2. Start local Pages dev server (serves `public/` and functions in `functions/`):

  wrangler pages dev ./public --local --port 8888

This serves the static site and routes functions from the `functions/` folder under `/api/<function-name>`.

Notes about Node modules & database drivers
- Cloudflare Pages Functions run in a bundled environment and do not natively provide all Node built-ins. If your functions use native Node modules (e.g. `pg`) you must bundle the project (esbuild, webpack, or use Wrangler's bundling) so that `pg` is available at runtime.
- For PostgreSQL (Neon) access from Cloudflare, consider using an HTTP-based API or a server that supports the Postgres driver, or switch to a Cloudflare-supported DB (D1) or an external API proxy. Direct use of `pg` in a Pages Function may require bundling and additional configuration.

Environment variables
Set these environment variables in the Cloudflare Pages project settings (or with `wrangler secret` for Workers):
- OPENAI_API_KEY
- BRAVE_API_KEY
- NEON_DATABASE_URL
- ADMIN_TOKEN
- DEEPAI_API_KEY
- GEMINI_API_KEY

To set a Pages variable via Wrangler for local dev:

  wrangler pages secret put OPENAI_API_KEY

(You will be prompted to paste the secret.)

Deploy to Cloudflare Pages
1. Create a Cloudflare Pages project that points to this repository.
2. Configure the build settings in the Pages UI:
   - Build command: (leave empty for static) or provide a bundler step if you need to bundle functions
   - Build output directory: `public`
   - Functions directory: leave blank (Pages uses `/functions` by default) or set to `functions` if required
3. Add the same environment variables in the Pages project settings.
4. Deploy from the Pages dashboard or push to the repo branch configured for Pages.

Using Wrangler to publish (optional)
You can publish directly with Wrangler. Add a `wrangler.toml` (see template in repo) and then run:

  wrangler pages publish ./public --project-name=YOUR_PROJECT_NAME

Replace `YOUR_PROJECT_NAME` with the Pages project name and ensure `wrangler.toml` has your `account_id`.

Post-migration checklist
- Verify all client-side calls were updated from `/.netlify/functions/...` to `/api/...` (done).
- Confirm environment variables are set in Cloudflare Pages.
- If you rely on `pg` / Postgres drivers, test DB access and consider using an API proxy or alternative DB solution if bundling doesn't work.
- Remove the Netlify-specific files (optional): `netlify.toml` and `netlify/functions/` if you no longer need them.

If you want, I can:
- Add a `wrangler.toml` template to the repo (I can do that now).
- Add an `esbuild` bundling step to `package.json` to produce a bundled functions output.

