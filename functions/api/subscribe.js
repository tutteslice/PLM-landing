import { Pool } from 'pg';

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};

// Note: Cloudflare Pages Functions require bundling for node modules (pg). Ensure you configure a bundler or use an external API for DB access.
let pool;
function getPool(env) {
  if (!pool) {
    pool = new Pool({
      connectionString: env.NEON_DATABASE_URL,
      ssl: { rejectUnauthorized: true, mode: 'require' }
    });
  }
  return pool;
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'OPTIONS') {
    return new Response('', { status: 200, headers: HEADERS });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: HEADERS });
  }
  try {
    const { email } = await request.json();
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400, headers: HEADERS });
    }
    const pool = getPool(env);
    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO newsletter_subscribers (email, created_at) VALUES ($1, NOW()) ON CONFLICT (email) DO NOTHING RETURNING id`,
        [email]
      );
      return new Response(JSON.stringify({ success: true, message: 'Successfully subscribed', isNew: result.rows.length > 0 }), { status: 200, headers: HEADERS });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: HEADERS });
  }
}
