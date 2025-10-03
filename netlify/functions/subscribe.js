require('dotenv').config()
console.log(process.env) 
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    mode: 'require'
  }
})

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email } = JSON.parse(event.body);
    
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Connect to Neon database
    const client = await pool.connect();

    // Insert email (with conflict handling)
    const result = await client.query(
      `INSERT INTO newsletter_subscribers (email, created_at) 
       VALUES ($1, NOW()) 
       ON CONFLICT (email) DO NOTHING 
       RETURNING id`,
      [email]
    );

    client.release();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed',
        isNew: result.rows.length > 0
      })
    };

  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};