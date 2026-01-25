#!/usr/bin/env node

/**
 * Database Verification Script
 * 
 * This script verifies that the affiliate marketing database schema
 * has been properly applied and is working correctly.
 * 
 * Usage:
 *   node database/verify.js
 */

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const NEON_DATABASE_URL = process.env.NEON_DATABASE_URL;

if (!NEON_DATABASE_URL) {
  console.error('❌ Error: NEON_DATABASE_URL environment variable is required');
  process.exit(1);
}

async function verifyDatabase() {
  const pool = new Pool({
    connectionString: NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: true, mode: 'require' }
  });

  const client = await pool.connect();

  try {
    console.log('🔍 Verifying affiliate marketing database setup...');
    console.log('');

    // Check if all required tables exist
    const tables = ['affiliate_clicks', 'email_leads', 'affiliate_products', 'affiliate_conversions'];
    console.log('📋 Checking required tables:');
    
    for (const table of tables) {
      const result = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        )
      `, [table]);
      
      const exists = result.rows[0].exists;
      console.log(`   ${exists ? '✅' : '❌'} ${table}`);
      
      if (!exists) {
        throw new Error(`Table ${table} does not exist. Please run the migration first.`);
      }
    }

    // Check product data
    console.log('');
    console.log('📦 Checking affiliate products:');
    const products = await client.query(`
      SELECT tier, category, name, active 
      FROM affiliate_products 
      ORDER BY tier, category, name
    `);

    const productsByTier = {};
    products.rows.forEach(product => {
      if (!productsByTier[product.tier]) {
        productsByTier[product.tier] = [];
      }
      productsByTier[product.tier].push({
        name: product.name,
        category: product.category,
        active: product.active
      });
    });

    Object.keys(productsByTier).forEach(tier => {
      console.log(`   Tier ${tier}:`);
      productsByTier[tier].forEach(product => {
        const status = product.active ? '✅' : '❌';
        console.log(`     ${status} ${product.name} (${product.category})`);
      });
    });

    // Test the helper function
    console.log('');
    console.log('🔧 Testing helper functions:');
    const vpnProducts = await client.query(`SELECT * FROM get_affiliate_products('vpn', 1)`);
    console.log(`   ✅ get_affiliate_products('vpn', 1) returned ${vpnProducts.rows.length} products`);

    // Check indexes
    console.log('');
    console.log('📊 Checking database indexes:');
    const indexes = await client.query(`
      SELECT schemaname, tablename, indexname 
      FROM pg_indexes 
      WHERE schemaname = 'public' 
      AND tablename IN ('affiliate_clicks', 'email_leads', 'affiliate_products', 'affiliate_conversions')
      ORDER BY tablename, indexname
    `);

    const indexesByTable = {};
    indexes.rows.forEach(index => {
      if (!indexesByTable[index.tablename]) {
        indexesByTable[index.tablename] = [];
      }
      indexesByTable[index.tablename].push(index.indexname);
    });

    Object.keys(indexesByTable).forEach(table => {
      console.log(`   ${table}: ${indexesByTable[table].length} indexes`);
    });

    // Test basic operations
    console.log('');
    console.log('🧪 Testing basic operations:');
    
    // Test inserting a test click (and immediately delete it)
    const testClick = await client.query(`
      INSERT INTO affiliate_clicks (product_id, source_page, session_id) 
      VALUES ('nordvpn', 'test', 'test-session') 
      RETURNING id
    `);
    
    await client.query('DELETE FROM affiliate_clicks WHERE id = $1', [testClick.rows[0].id]);
    console.log('   ✅ affiliate_clicks insert/delete test passed');

    // Test inserting a test email lead (and immediately delete it)
    const testEmail = await client.query(`
      INSERT INTO email_leads (email, source_page, lead_magnet, consent_given) 
      VALUES ('test@example.com', 'test', 'test-pdf', true) 
      RETURNING id
    `);
    
    await client.query('DELETE FROM email_leads WHERE id = $1', [testEmail.rows[0].id]);
    console.log('   ✅ email_leads insert/delete test passed');

    console.log('');
    console.log('✅ Database verification completed successfully!');
    console.log('');
    console.log('Your affiliate marketing database is ready for use.');

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

verifyDatabase().catch(console.error);