# Integration Guide: Croatian Beats → Private Lives Matter

## Overview
This guide will help you integrate Croatian Beats as a tool into the Private Lives Matter website.

## Prerequisites
- Access to the PLM GitHub repository: https://github.com/tutteslice/PLM-landing.git
- Node.js installed
- Understanding of the PLM site's tech stack

---

## Step 1: Understand the PLM Site Structure

First, clone and examine the PLM repository:

```bash
git clone https://github.com/tutteslice/PLM-landing.git
cd PLM-landing
```

Check the tech stack:
- Look at `package.json` to see what framework is used
- Check if it's React, Vue, vanilla JS, or another framework
- Note the build system (Vite, Webpack, etc.)

---

## Step 2: Choose Integration Approach

### Option A: If PLM uses React (Recommended)
If PLM is built with React, you can directly integrate the components.

### Option B: If PLM uses a different framework
You'll need to either:
1. Build Croatian Beats as a standalone app and embed it via iframe
2. Port the components to match PLM's framework
3. Create a micro-frontend architecture

---

## Step 3: Integration Steps (React-based PLM)

### 3.1 Copy Croatian Beats Components

Copy these files/folders from Croatian Beats to PLM:

```
PLM-landing/
├── tools/
│   └── croatian-beats/
│       ├── components/
│       │   ├── Translator.tsx
│       │   └── FestivalLesson.tsx
│       ├── services/
│       │   └── geminiService.ts
│       ├── types.ts
│       └── CroatianBeatsApp.tsx (new wrapper)
```

### 3.2 Create a Wrapper Component

Create `CroatianBeatsApp.tsx` in PLM that wraps the Croatian Beats functionality:

```typescript
// tools/croatian-beats/CroatianBeatsApp.tsx
import React, { useState } from 'react';
import Translator from './components/Translator';
import FestivalLesson from './components/FestivalLesson';

type View = 'translator' | 'lesson';

const CroatianBeatsApp: React.FC = () => {
  const [view, setView] = useState<View>('translator');

  return (
    <div className="croatian-beats-app">
      {/* Navigation tabs */}
      <div className="tabs">
        <button 
          onClick={() => setView('translator')}
          className={view === 'translator' ? 'active' : ''}
        >
          Translator
        </button>
        <button 
          onClick={() => setView('lesson')}
          className={view === 'lesson' ? 'active' : ''}
        >
          Festival Guide
        </button>
      </div>

      {/* Content */}
      {view === 'translator' ? <Translator /> : <FestivalLesson />}
    </div>
  );
};

export default CroatianBeatsApp;
```

### 3.3 Add to PLM Navigation

In your PLM site's main navigation/routing file, add Croatian Beats:

```typescript
// Example: If using React Router
import { Routes, Route } from 'react-router-dom';
import CroatianBeatsApp from './tools/croatian-beats/CroatianBeatsApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/information" element={<InformationPage />} />
      <Route path="/tools/croatian-beats" element={<CroatianBeatsApp />} />
      {/* ... other routes */}
    </Routes>
  );
}
```

### 3.4 Add Tool Card to Landing Page

On the PLM landing page, add a card for Croatian Beats:

```tsx
// In your landing page component
<div className="tool-card" onClick={() => navigate('/tools/croatian-beats')}>
  <h3>Croatian Beats</h3>
  <p>Your essential Croatian translation tool for festivals, parties, and everyday conversations</p>
</div>
```

### 3.5 Install Dependencies

In PLM's `package.json`, add Croatian Beats dependencies:

```json
{
  "dependencies": {
    "@google/genai": "^1.34.0",
    // ... existing dependencies
  }
}
```

Then run:
```bash
npm install
```

### 3.6 Environment Variables

Add to PLM's `.env` file:
```
GEMINI_API_KEY=your_api_key_here
```

Update `geminiService.ts` to use the correct env variable name if needed.

---

## Step 4: Integration Steps (Non-React PLM)

### 4.1 Build Croatian Beats as Standalone

Build Croatian Beats as a separate app:

```bash
cd croatiabeats---translator-&-festival-guide
npm run build
```

This creates a `dist/` folder with static files.

### 4.2 Deploy Croatian Beats Separately

Deploy the built Croatian Beats app to:
- Netlify
- Vercel
- GitHub Pages
- Or any static hosting

### 4.3 Embed via iframe or Link

In PLM, add a link or iframe:

```html
<!-- Option 1: Direct link -->
<a href="https://croatian-beats.yourdomain.com" target="_blank">
  Croatian Beats Tool
</a>

<!-- Option 2: Embedded iframe -->
<iframe 
  src="https://croatian-beats.yourdomain.com" 
  width="100%" 
  height="800px"
  frameborder="0"
></iframe>
```

---

## Step 5: Styling Integration

### 5.1 Match PLM Design System

Update Croatian Beats components to match PLM's design:

1. Check PLM's CSS/styling approach (Tailwind, CSS Modules, etc.)
2. Update component classes to match PLM's design tokens
3. Ensure consistent colors, fonts, and spacing

### 5.2 Example Style Updates

```tsx
// Update Translator.tsx to use PLM's design tokens
<div className="plm-card"> {/* instead of bg-slate-800/50 */}
  {/* ... */}
</div>
```

---

## Step 6: Testing

1. **Test locally**: Run both apps locally and verify integration
2. **Test navigation**: Ensure smooth transitions between PLM and Croatian Beats
3. **Test API**: Verify Gemini API calls work with PLM's environment setup
4. **Test responsive**: Check mobile/tablet/desktop views

---

## Step 7: Deployment

### If integrated directly:
1. Build PLM site: `npm run build`
2. Deploy to Netlify/Vercel/etc.

### If separate apps:
1. Deploy Croatian Beats separately
2. Update PLM with correct iframe/link URL
3. Deploy PLM

---

## Alternative: Micro-Frontend Approach

For a more scalable solution, consider:

1. **Module Federation** (if using Webpack)
2. **Single-SPA** framework
3. **Web Components** approach

This allows Croatian Beats to be developed independently while integrated into PLM.

---

## Troubleshooting

### Issue: API Key not working
- Check environment variable names match
- Verify API key is set in deployment environment
- Check CORS settings if API calls fail

### Issue: Styling conflicts
- Use CSS scoping or CSS Modules
- Add a namespace prefix to Croatian Beats classes
- Use Shadow DOM for complete isolation

### Issue: Routing conflicts
- Use different route prefixes (`/tools/croatian-beats/*`)
- Ensure proper 404 handling

---

## Next Steps

1. **Examine PLM repo structure** to determine exact integration approach
2. **Choose integration method** based on PLM's tech stack
3. **Start with minimal integration** (just Translator component)
4. **Iterate and refine** styling and UX
5. **Add more tools** following the same pattern

---

## Files to Copy from Croatian Beats

Essential files:
- `components/Translator.tsx`
- `components/FestivalLesson.tsx`
- `services/geminiService.ts`
- `types.ts`

Optional (for full functionality):
- All component files
- Configuration files
- Type definitions

---

## Questions to Answer First

Before starting, determine:
1. What framework does PLM use? (Check `package.json`)
2. Does PLM have a routing system? (React Router, Next.js, etc.)
3. How is PLM styled? (Tailwind, CSS Modules, styled-components?)
4. Where should Croatian Beats appear? (New page, modal, section?)
5. Should Croatian Beats share PLM's header/footer or be standalone?

Once you answer these, the integration path becomes clearer!

