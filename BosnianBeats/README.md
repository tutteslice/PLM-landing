# Bosnian Beats - Integration Complete ✅

## What Was Created

A complete Bosnian translation tool, similar to Balkan Beats (Croatian), integrated into the Private Lives Matter website.

## Files Created

### Cloudflare Functions
- `functions/api/bosnian-beats-translate.js` - Translation API endpoint
- `functions/api/bosnian-beats-speak.js` - Text-to-speech API endpoint
- `functions/api/bosnian-beats-live.js` - Placeholder (WebSocket not supported)

### React Components
- `BosnianBeats/components/Translator.tsx` - Main translation component
- `BosnianBeats/components/FestivalLesson.tsx` - Festival phrase guide
- `BosnianBeats/BosnianBeatsApp.tsx` - Main app wrapper
- `BosnianBeats/services/geminiService.ts` - API service layer
- `BosnianBeats/types.ts` - TypeScript types

### Build Configuration
- `BosnianBeats/package.json` - Dependencies and scripts
- `BosnianBeats/vite.config.ts` - Vite build configuration
- `BosnianBeats/index-plm.html` - HTML entry point
- `BosnianBeats/index-plm.tsx` - React entry point
- `BosnianBeats/tsconfig.json` - TypeScript configuration

## Next Steps to Complete Integration

1. **Install Dependencies**:
   ```bash
   cd BosnianBeats
   npm install
   ```

2. **Build the App**:
   ```bash
   npm run build
   ```
   
   This will create `public/bosnian-beats/` with the built files.

3. **Rename the built HTML file** (if needed):
   ```bash
   mv public/bosnian-beats/index-plm.html public/bosnian-beats/index.html
   ```

4. **Test Locally**:
   ```bash
   wrangler pages dev ./public --local --port 8888
   ```
   
   Then visit: http://localhost:8888/bosnian-beats/

5. **Deploy**:
   The tool will be automatically deployed when you deploy the PLM site.

## Features

✅ **Translator**: 
- Translate text from English/Swedish to Bosnian
- Three translation modes: Natural, Formal, Literal
- Phonetic guides for pronunciation
- Text-to-speech for Bosnian phrases
- ⚠️ Voice input disabled (requires WebSocket support)

✅ **Festival Guide**:
- Essential Bosnian phrases for festivals, parties, and raves
- Categorized by context (Festival, House Party, Rave)
- Audio pronunciation for each phrase
- Swedish and English translations included

## Navigation

- **From PLM**: Click the "Bosnian Beats" card in the "Våra Verktyg" section
- **From Bosnian Beats**: Click the logo/header or footer button to return to PLM
- **Direct URL**: `/bosnian-beats/`

## Environment Variables

Uses the same `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) as Balkan Beats - no additional setup needed!

## Differences from Balkan Beats

- Different color scheme (blue/purple gradient instead of purple/pink)
- "BA" logo instead of "HR"
- Bosnian language instead of Croatian
- Some phrases adapted for Bosnian (e.g., "muziku" instead of "glazbu")

