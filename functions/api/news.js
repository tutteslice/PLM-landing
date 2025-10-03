import { Pool } from 'pg';

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS'
};

function jsonResponse(statusCode, body, headers = {}) {
  return new Response(JSON.stringify(body), { status: statusCode, headers: { ...HEADERS, ...headers } });
}

function requireAdmin(request, env) {
  const header = request.headers.get('x-admin-token') || request.headers.get('X-Admin-Token');
  return header && env.ADMIN_TOKEN && header === env.ADMIN_TOKEN;
}

let pool;
function getPool(env) {
  if (!pool) {
    pool = new Pool({ connectionString: env.NEON_DATABASE_URL, ssl: { rejectUnauthorized: true, mode: 'require' } });
  }
  return pool;
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response('', { status: 200, headers: HEADERS });
  }

  const pool = getPool(env);
  const client = await pool.connect();
  try {
    if (request.method === 'GET') {
      const isAdmin = requireAdmin(request, env);
      const url = new URL(request.url);
      const id = url.searchParams.get('id');
      const slug = url.searchParams.get('slug');
      if (id) {
        const { rows } = await client.query('SELECT * FROM news_posts WHERE id = $1', [id]);
        return rows[0] ? jsonResponse(200, rows[0]) : jsonResponse(404, { error: 'Not found' });
      }
      if (slug) {
        const { rows } = await client.query('SELECT * FROM news_posts WHERE slug = $1', [slug]);
        return rows[0] ? jsonResponse(200, rows[0]) : jsonResponse(404, { error: 'Not found' });
      }
      const { rows } = await client.query(isAdmin ? 'SELECT * FROM news_posts ORDER BY created_at DESC' : 'SELECT * FROM news_posts WHERE published = true ORDER BY created_at DESC');
      return jsonResponse(200, rows);
    }

    if (request.method === 'POST') {
      if (!requireAdmin(request, env)) return jsonResponse(401, { error: 'Unauthorized' });
      const { title, content, imageUrl, published } = await request.json().catch(() => ({}));
      if (!title || !content) return jsonResponse(400, { error: 'Missing title or content' });
      const slug = (title || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
      const { rows } = await client.query(`INSERT INTO news_posts (title, content, image_url, published, slug, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,NOW(),NOW()) RETURNING *`, [title, content, imageUrl || null, !!published, slug]);
      return jsonResponse(200, rows[0]);
    }

    if (request.method === 'PUT') {
      if (!requireAdmin(request, env)) return jsonResponse(401, { error: 'Unauthorized' });
      const { id, title, content, imageUrl, published } = await request.json().catch(() => ({}));
      if (!id) return jsonResponse(400, { error: 'Missing id' });
      const { rows } = await client.query(`UPDATE news_posts SET title = COALESCE($2,title), content = COALESCE($3,content), image_url = COALESCE($4,image_url), published = COALESCE($5,published), updated_at = NOW() WHERE id = $1 RETURNING *`, [id, title, content, imageUrl, typeof published === 'boolean' ? published : null]);
      return rows[0] ? jsonResponse(200, rows[0]) : jsonResponse(404, { error: 'Not found' });
    }

    return jsonResponse(405, { error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return jsonResponse(500, { error: 'Internal server error' });
  } finally {
    client.release();
  }
}
