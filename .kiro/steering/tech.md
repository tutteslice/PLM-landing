# Technology Stack

## Frontend
- **Static HTML/CSS/JavaScript** - No framework, vanilla implementation
- **Responsive design** with CSS Grid and Flexbox
- **Swedish language** content and UI
- **Dark theme** with CSS custom properties
- **Smooth animations** and intersection observers

## Backend
- **Netlify Functions** - Serverless Node.js functions
- **PostgreSQL** (Neon) - Database for newsletter subscribers and news posts
- **Google Generative AI** - Content and image generation
- **CommonJS modules** - Node.js module system

## Deployment
- **Netlify** - Static site hosting and serverless functions
- **Environment variables** - `.env` for local development
- **Build configuration** in `netlify.toml`

## Key Dependencies
- `@google/generative-ai` - AI content generation
- `pg` - PostgreSQL client
- `dotenv` - Environment variable management

## Common Commands
```bash
# Development server
npm run dev

# Deploy to Netlify
npm run deploy

# Install dependencies (functions)
cd netlify/functions && npm install
```

## Database Schema
- `newsletter_subscribers` table with email and timestamps
- `news_posts` table with title, content, slug, published status, and metadata