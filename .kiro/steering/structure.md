# Project Structure

## Root Level
- `index.html` - Main landing page with Swedish content
- `package.json` - Project metadata and scripts
- `netlify.toml` - Netlify deployment configuration
- `.env` / `.env.example` - Environment variables

## Public Directory (`public/`)
Static files served directly by Netlify:
- `public/index.html` - Alternative main page
- `public/news/index.html` - News listing page
- `public/admin/index.html` - Content management interface
- `public/store/index.html` - Store page

## Netlify Functions (`netlify/functions/`)
Serverless backend functions:
- `subscribe.js` - Newsletter subscription handler
- `news.js` - News CRUD API with admin authentication
- `news-generate.js` - AI-powered article generation
- `image-generate.js` - AI-powered image generation
- `web-search.js` - Web search functionality
- `package.json` - Function dependencies

## Build Artifacts (`.netlify/`)
Generated during deployment - should not be modified manually.

## Conventions
- **Swedish language** for all user-facing content
- **Kebab-case** for file names and URLs
- **Snake_case** for database columns
- **CamelCase** for JavaScript variables
- **Admin authentication** via `X-Admin-Token` header
- **CORS enabled** for all API endpoints
- **Error handling** with proper HTTP status codes

## File Naming
- Static pages: `index.html` in subdirectories
- Functions: descriptive names with `.js` extension
- Database tables: plural nouns with underscores