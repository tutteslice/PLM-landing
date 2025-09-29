# Repository Guidelines

## Project Structure & Module Organization
- Root static site: `index.html` (HTML/CSS/JS only).
- Serverless functions: `netlify/functions/` (Node.js, CommonJS). Example: `subscribe.js` posts emails to Neon/Postgres.
- Deployment config: `netlify.toml` (kept minimal; extend as needed).

## Build, Test, and Development Commands
- Install Netlify CLI: `npm i -g netlify-cli`.
- Install function deps: `cd netlify/functions && npm i pg`.
- Run locally (serves HTML + functions): from repo root, `netlify dev` (default port 8888).
- Exercise the function:
  - `curl -X POST -H 'Content-Type: application/json' -d '{"email":"you@example.com"}' http://localhost:8888/.netlify/functions/subscribe`
- Deploy to Netlify: `netlify deploy --prod` (ensure env vars are set).

## Coding Style & Naming Conventions
- JavaScript (functions): 2‑space indent, semicolons, single quotes, `camelCase` for vars/functions. Keep functions in `netlify/functions/*.js` using `exports.handler`.
- CSS: class names in `kebab-case`; prefer utility-like, descriptive names. Keep styles inline in `index.html` unless extracting.
- Filenames: `kebab-case` for assets; functions in lowercase (e.g., `subscribe.js`).

## Testing Guidelines
- No tests currently. If adding tests for functions, prefer Vitest or Jest.
- Test files: colocate as `subscribe.test.js` or under `netlify/functions/__tests__/`.
- Aim for ≥80% coverage on critical logic (validation, DB errors). Run via `npm test` inside the functions directory.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat: add subscribe Netlify Function`, `fix: handle invalid emails`.
- PRs should include:
  - Clear description and rationale; link issues.
  - Local verification notes (e.g., `curl` output) and screenshots for UI changes.
  - For config changes, list required env vars and Netlify settings.

## Security & Configuration Tips
- Secrets: never commit. Set `NEON_DATABASE_URL` in Netlify (or `.env` for local with `netlify dev`).
- Database: ensure the `newsletter_subscribers(email, created_at)` table exists; the function safely `ON CONFLICT DO NOTHING`.
- CORS: function returns `Access-Control-Allow-Origin: *`; narrow in production if embedding elsewhere.
