require('dotenv').config();

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  const key = process.env.BRAVE_API_KEY;
  if (!key) {
    return { statusCode: 500, body: JSON.stringify({ error: 'BRAVE_API_KEY not set' }) };
  }
  try {
    const { query, limit } = JSON.parse(event.body || '{}');
    if (!query) return { statusCode: 400, body: JSON.stringify({ error: 'Missing query' }) };
    const q = encodeURIComponent(query);
    const url = `https://api.search.brave.com/res/v1/web/search?q=${q}&count=${Math.min(Number(limit)||5,10)}`;
    const resp = await fetch(url, { headers: { 'Accept': 'application/json', 'X-Subscription-Token': key } });
    const data = await resp.json();
    if (!resp.ok) {
      const message = data?.message || data?.error || JSON.stringify(data).slice(0,500);
      return { statusCode: 500, headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: message }) };
    }
    const items = (data?.web?.results || []).map(r => ({
      title: r.title,
      url: r.url,
      snippet: r.description || r.snippet || ''
    }));
    return { statusCode: 200, headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ results: items }) };
  } catch (e) {
    console.error('Brave search failed', e);
    return { statusCode: 500, body: JSON.stringify({ error: 'Search failed' }) };
  }
};

