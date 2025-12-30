# Troubleshooting Wrangler Dev Server

## 404 Errors on Root Path

If you're seeing 404 errors when accessing `http://localhost:8888/`, try:

1. **Stop the current dev server** (Ctrl+C)

2. **Restart with the updated command**:
   ```bash
   npm run dev
   ```
   
   Or directly:
   ```bash
   wrangler pages dev ./public --local --port 8888
   ```

3. **Verify the files exist**:
   ```bash
   ls -la public/index.html
   ```

4. **Check the functions directory**:
   - Functions should be in `functions/api/`
   - They'll be accessible at `/api/<function-name>`

## Common Issues

### Issue: 404 on all routes
**Solution**: Make sure you're using the `--local` flag:
```bash
wrangler pages dev ./public --local --port 8888
```

### Issue: Functions not working
**Solution**: 
- Check that functions are in `functions/api/` directory
- Verify function exports `onRequest` (not `handler`)
- Check browser console for CORS errors

### Issue: Balkan Beats not loading
**Solution**:
- Verify build completed: `cd BalkanBeats && npm run build`
- Check `public/balkan-beats/index.html` exists
- Verify base path in vite.config.ts is `/balkan-beats/`

### Issue: API calls failing
**Solution**:
- Set environment variables:
  ```bash
  wrangler pages secret put GEMINI_API_KEY
  ```
- Or use `.env` file (not recommended for production)

## Testing Routes

After starting the dev server, test these URLs:
- Main site: http://localhost:8888/
- Balkan Beats: http://localhost:8888/balkan-beats/
- API endpoint: http://localhost:8888/api/balkan-beats-translate (POST)


