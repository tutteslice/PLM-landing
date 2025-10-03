export async function onRequest(context) {
  const { request, env } = context;
  const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
  };
  if (request.method === 'OPTIONS') {
    return new Response('', { status: 200, headers: HEADERS });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: HEADERS });
  }
  const key = env.BRAVE_API_KEY;
  if (!key) {
    return new Response(JSON.stringify({ error: 'BRAVE_API_KEY not set' }), { status: 500, headers: HEADERS });
  }
  try {
    const { query, limit } = await request.json().catch(() => ({}));
    if (!query) return new Response(JSON.stringify({ error: 'Missing query' }), { status: 400, headers: HEADERS });
    const q = encodeURIComponent(query);
    const url = `https://api.search.brave.com/res/v1/web/search?q=${q}&count=${Math.min(Number(limit) || 5, 10)}`;
    const resp = await fetch(url, { headers: { 'Accept': 'application/json', 'X-Subscription-Token': key } });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      const message = data?.message || data?.error || JSON.stringify(data).slice(0, 500);
      return new Response(JSON.stringify({ error: message }), { status: 500, headers: HEADERS });
    }
    const items = (data?.web?.results || []).map(r => ({
      title: r.title,
      url: r.url,
      snippet: r.description || r.snippet || ''
    }));
    return new Response(JSON.stringify({ results: items }), { status: 200, headers: HEADERS });
  } catch (e) {
    console.error('Brave search failed', e);
    return new Response(JSON.stringify({ error: 'Search failed' }), { status: 500, headers: HEADERS });
  }
}
