# Quick Start: Croatian Beats → PLM Integration

## Immediate Next Steps

### 1. Examine PLM Repository (5 minutes)
```bash
git clone https://github.com/tutteslice/PLM-landing.git
cd PLM-landing
cat package.json  # Check tech stack
ls -la            # See file structure
```

### 2. Identify Tech Stack
Look for these indicators:
- **React**: `react` in dependencies → Use Option A (direct integration)
- **Vue**: `vue` in dependencies → Use Option B (port or iframe)
- **Vanilla JS**: No framework → Use Option B (iframe or port)
- **Next.js**: `next` in dependencies → Use Next.js routing
- **Netlify Functions**: `functions/` folder → May need serverless functions

### 3. Quick Decision Tree

```
Is PLM built with React?
├─ YES → Direct component integration (easiest)
│   └─ Copy components, add route, style match
│
└─ NO → Choose one:
    ├─ Option 1: Build as separate app + iframe
    │   └─ Build Croatian Beats → Deploy → Embed
    │
    ├─ Option 2: Port components to PLM's framework
    │   └─ Rewrite Translator/FestivalLesson in PLM's framework
    │
    └─ Option 3: Create API + rebuild UI in PLM's framework
        └─ Keep geminiService.ts logic, rebuild UI
```

---

## Recommended Approach (Based on Netlify Setup)

Since PLM uses Netlify (based on `netlify.toml`), here's the recommended path:

### Step 1: Create Croatian Beats Route in PLM

1. **Add route handler** (if using a framework router)
2. **Create Croatian Beats page component**
3. **Copy necessary files**

### Step 2: Handle API Calls

Since Gemini API needs to run server-side (API keys), you have two options:

**Option A: Netlify Functions**
```javascript
// netlify/functions/translate.js
exports.handler = async (event) => {
  const { text } = JSON.parse(event.body);
  // Call Gemini API here
  return { statusCode: 200, body: JSON.stringify(result) };
};
```

**Option B: Client-side with environment variable**
- Set `GEMINI_API_KEY` in Netlify environment variables
- Update `geminiService.ts` to use `import.meta.env.VITE_GEMINI_API_KEY` (for Vite)
- Or `process.env.GEMINI_API_KEY` (for other setups)

### Step 3: Add to PLM Navigation

Update PLM's navigation to include Croatian Beats:

```javascript
// In your navigation component
const tools = [
  { name: 'Information', path: '/#information' },
  { name: 'Croatian Beats', path: '/tools/croatian-beats' },
  // ... other tools
];
```

---

## Minimal Integration (Get It Working Fast)

### If PLM is React-based:

1. **Copy files**:
   ```bash
   # From Croatian Beats project
   cp -r components/Translator.tsx PLM-landing/src/tools/croatian-beats/
   cp -r components/FestivalLesson.tsx PLM-landing/src/tools/croatian-beats/
   cp -r services/geminiService.ts PLM-landing/src/tools/croatian-beats/
   ```

2. **Create wrapper**:
   ```tsx
   // PLM-landing/src/tools/croatian-beats/index.tsx
   export { default as CroatianBeats } from './CroatianBeatsApp';
   ```

3. **Add route** (if using React Router):
   ```tsx
   <Route path="/tools/croatian-beats" element={<CroatianBeats />} />
   ```

4. **Add to tools list** on landing page

5. **Set environment variable** in Netlify dashboard

6. **Test and deploy**

---

## If PLM is NOT React-based:

### Fastest Path: Separate Deployment

1. **Keep Croatian Beats separate** (current setup)
2. **Deploy to Netlify/Vercel** with its own domain/subdomain
3. **Add link/button** in PLM that opens Croatian Beats in new tab
4. **Or embed via iframe** if you want it inline

```html
<!-- In PLM HTML -->
<a href="https://croatian-beats.netlify.app" 
   target="_blank" 
   class="tool-button">
  Croatian Beats →
</a>
```

---

## Environment Setup Checklist

- [ ] Clone PLM repository
- [ ] Identify tech stack (check package.json)
- [ ] Check if PLM has environment variable setup
- [ ] Determine routing approach
- [ ] Choose integration method
- [ ] Set up API key handling
- [ ] Test locally
- [ ] Deploy

---

## Need Help?

1. **Share PLM's package.json** → I can give specific instructions
2. **Share PLM's routing setup** → I can show exact integration code
3. **Share PLM's styling approach** → I can help match the design

---

## Most Likely Scenario (Netlify + React)

If PLM is React-based on Netlify:

1. Copy Croatian Beats components to `PLM-landing/src/tools/croatian-beats/`
2. Add route in PLM's router
3. Update `geminiService.ts` to use Netlify environment variables
4. Add Croatian Beats card to PLM landing page
5. Set `GEMINI_API_KEY` in Netlify dashboard
6. Deploy

This should take ~30 minutes if PLM is React-based!

