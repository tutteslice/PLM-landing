require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: true, mode: 'require' }
});

function json(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...headers },
    body: JSON.stringify(body)
  };
}

function requireAdmin(event) {
  const header = event.headers['x-admin-token'] || event.headers['X-Admin-Token'];
  return header && process.env.ADMIN_TOKEN && header === process.env.ADMIN_TOKEN;
}

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS'
      },
      body: ''
    };
  }

  const client = await pool.connect();
  try {
    if (event.httpMethod === 'GET') {
      const isAdmin = requireAdmin(event);
      const id = event.queryStringParameters && event.queryStringParameters.id;
      const slug = event.queryStringParameters && event.queryStringParameters.slug;
      if (id) {
        const { rows } = await client.query('SELECT * FROM news_posts WHERE id = $1', [id]);
        return rows[0] ? json(200, rows[0]) : json(404, { error: 'Not found' });
      }
      if (slug) {
        const { rows } = await client.query('SELECT * FROM news_posts WHERE slug = $1', [slug]);
        return rows[0] ? json(200, rows[0]) : json(404, { error: 'Not found' });
      }
      const { rows } = await client.query(
        isAdmin ? 'SELECT * FROM news_posts ORDER BY created_at DESC' : 'SELECT * FROM news_posts WHERE published = true ORDER BY created_at DESC'
      );
      return json(200, rows);
    }

    if (event.httpMethod === 'POST') {
      if (!requireAdmin(event)) return json(401, { error: 'Unauthorized' });
      const { title, content, imageUrl, published } = JSON.parse(event.body || '{}');
      if (!title || !content) return json(400, { error: 'Missing title or content' });
      const slug = (title || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      const { rows } = await client.query(
        `INSERT INTO news_posts (title, content, image_url, published, slug, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,NOW(),NOW()) RETURNING *`,
        [title, content, imageUrl || null, !!published, slug]
      );
      return json(200, rows[0]);
    }

    if (event.httpMethod === 'PUT') {
      if (!requireAdmin(event)) return json(401, { error: 'Unauthorized' });
      const { id, title, content, imageUrl, published } = JSON.parse(event.body || '{}');
      if (!id) return json(400, { error: 'Missing id' });
      const { rows } = await client.query(
        `UPDATE news_posts SET title = COALESCE($2,title), content = COALESCE($3,content), image_url = COALESCE($4,image_url), published = COALESCE($5,published), updated_at = NOW() WHERE id = $1 RETURNING *`,
        [id, title, content, imageUrl, typeof published === 'boolean' ? published : null]
      );
      return rows[0] ? json(200, rows[0]) : json(404, { error: 'Not found' });
    }

    return json(405, { error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return json(500, { error: 'Internal server error' });
  } finally {
    client.release();
  }
};

