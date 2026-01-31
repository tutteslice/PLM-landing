# Building Balkan Beats for PLM Integration

## Prerequisites

1. Node.js installed
2. Dependencies installed: `npm install` (in the BalkanBeats directory)

## Build Steps

1. **Install dependencies** (if not already done):
   ```bash
   cd BalkanBeats
   npm install
   ```

2. **Build the React app**:
   ```bash
   npm run build
   ```

   This will:
   - Build the React app using Vite
   - Output files to `../public/balkan-beats/`
   - Create the production-ready static files

3. **Verify the build**:
   - Check that `public/balkan-beats/index.html` exists
   - Check that `public/balkan-beats/assets/` contains the bundled JS and CSS

## Deployment

The built files in `public/balkan-beats/` will be automatically deployed when you deploy the PLM site to Cloudflare Pages.

## Environment Variables

Make sure to set `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) in your Cloudflare Pages environment variables for the API functions to work.

## Testing Locally

1. **Start the PLM dev server**:
   ```bash
   wrangler pages dev ./public --local --port 8888
   ```

2. **Navigate to**:
   - Main site: http://localhost:8888
   - Balkan Beats: http://localhost:8888/balkan-beats/

## Troubleshooting

- If the build fails, check that all dependencies are installed
- If the app doesn't load, verify the base path in `vite.config.ts` is `/balkan-beats/`
- If API calls fail, check that `GEMINI_API_KEY` is set in Cloudflare Pages



