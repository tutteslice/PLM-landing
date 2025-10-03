# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Private Lives Matter (PLM) is a Swedish static website with Netlify Functions focused on digital privacy rights and free speech. The project combines a static frontend with serverless backend functions for newsletter subscription, news generation, web search, and image generation.

## Development Commands

**Local Development:**
```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Install function dependencies
cd netlify/functions && npm install

# Run local development server (serves static site + functions)
netlify dev
# Default port: http://localhost:8888
```

**Testing Functions:**
```bash
# Test newsletter subscription
curl -X POST -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com"}' \
  http://localhost:8888/.netlify/functions/subscribe

# Test news generation
curl -X POST -H 'Content-Type: application/json' \
  -d '{"topic":"digital privacy"}' \
  http://localhost:8888/.netlify/functions/news-generate

# Test web search
curl -X POST -H 'Content-Type: application/json' \
  -d '{"query":"privacy rights", "limit":5}' \
  http://localhost:8888/.netlify/functions/web-search
```

**Deployment:**
```bash
# Deploy to production
netlify deploy --prod
```

## Architecture

### Frontend Structure
- **Root site**: `index.html` - Main landing page with embedded CSS/JS
- **Public pages**: `public/` directory contains:
  - `news/index.html` - News listing page
  - `store/index.html` - Store page  
  - `admin/index.html` - Admin interface
- **Static assets**: Served directly from `public/` directory

### Backend Functions (`netlify/functions/`)
- **subscribe.js**: Newsletter subscription with PostgreSQL/Neon database
- **news-generate.js**: AI-powered news article generation using OpenAI
- **web-search.js**: Web search functionality using Brave Search API
- **image-generate.js**: Image generation capabilities
- **news.js**: News content retrieval

### Database
- Uses Neon PostgreSQL database
- Newsletter subscribers stored in `newsletter_subscribers(email, created_at)` table
- Functions handle database connections via connection pooling

## Environment Variables

Required for local development (`.env` in `netlify/functions/`):
```
NEON_DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
BRAVE_API_KEY=...
```

For production, set these in Netlify dashboard under Environment Variables.

## Code Conventions

### JavaScript (Functions)
- CommonJS modules (`exports.handler`)
- 2-space indentation
- Single quotes for strings
- camelCase for variables/functions
- Error handling with try/catch blocks
- CORS headers: `Access-Control-Allow-Origin: *`

### HTML/CSS
- Inline styles in HTML files
- CSS class names in kebab-case
- CSS custom properties (variables) for theming
- Responsive design with mobile-first approach

### Function Structure
- Each function exports a `handler` async function
- HTTP method validation (typically POST only)
- Input validation and sanitization
- Proper error responses with status codes
- Database connection pooling for PostgreSQL functions

## Security Considerations

- Environment variables for sensitive data (API keys, database URLs)
- SQL injection protection using parameterized queries
- Email validation before database insertion
- ON CONFLICT DO NOTHING for duplicate email handling
- SSL required for database connections

## Deployment Configuration

- Build directory: `public`
- Functions directory: `netlify/functions`
- External Node modules bundled: `pg`, `dotenv`
- Function timeout: 90 seconds for `news-generate`
- Node bundler: esbuild