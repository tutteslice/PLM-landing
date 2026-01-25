#!/usr/bin/env node

/**
 * Database Migration Script for Affiliate Marketing
 * 
 * This script applies the affiliate marketing schema to your Neon PostgreSQL database.
 * It safely extends the existing database without affecting current tables.
 * 
 * Usage:
 *   node database/migrate.js
 * 
 * Environment Variables Required:
 *   NEON_DATABASE_URL - Your Neon PostgreSQL connection string
 */

import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const NEON_DATABASE_URL = process.env.NEON_DATABASE_URL;

if (!NEON_DATABASE_URL) {
  console.error('❌ Error: NEON_DATABASE_URL environment variable is required');
  console.error('   Please set it in your .env file or environment');
  process.exit(1);
}

async function runMigration() {
  const pool = new Pool({
    connectionString: NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: true, mode: 'require' }
  });

  const client = await pool.connect();

  try {
    console.log('🚀 Starting affiliate marketing database migration...');
    
    // Read the SQL schema file
    const schemaSQL = readFileSync(join(__dirname, 'affiliate-schema.sql'), 'utf8');
    
    // Execute the schema
    console.log('📊 Creating affiliate marketing tables...');
    await client.query(schemaSQL);
    
    // Verify the tables were created
    console.log('✅ Verifying table creation...');
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('affiliate_clicks', 'email_leads', 'affiliate_products', 'affiliate_conversions')
      ORDER BY table_name
    `);
    
    console.log('📋 Created tables:');
    tableCheck.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });
    
    // Check product data
    const productCount = await client.query('SELECT COUNT(*) as count FROM affiliate_products');
    console.log(`📦 Inserted ${productCount.rows[0].count} affiliate products`);
    
    // Show products by tier
    const productsByTier = await client.query(`
      SELECT tier, COUNT(*) as count, array_agg(name ORDER BY name) as products
      FROM affiliate_products 
      WHERE active = true
      GROUP BY tier 
      ORDER BY tier
    `);
    
    console.log('🎯 Products by tier:');
    productsByTier.rows.forEach(row => {
      console.log(`   Tier ${row.tier}: ${row.count} products`);
      row.products.forEach(product => {
        console.log(`     • ${product}`);
      });
    });
    
    console.log('✅ Migration completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Test the affiliate tracking function');
    console.log('2. Implement the email capture system');
    console.log('3. Create the affiliate marketing pages');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('');
    console.error('Common issues:');
    console.error('• Check your NEON_DATABASE_URL is correct');
    console.error('• Ensure your database is accessible');
    console.error('• Verify you have CREATE TABLE permissions');
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the migration
runMigration().catch(console.error);