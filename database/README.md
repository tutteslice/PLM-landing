# Affiliate Marketing Database Setup

This directory contains the database schema and migration scripts for the Private Lives Matter affiliate marketing system.

## Overview

The affiliate marketing system extends your existing PostgreSQL database with four new tables:

- **`affiliate_clicks`** - Tracks all affiliate link clicks with metadata
- **`email_leads`** - Stores email leads from lead magnets with GDPR consent
- **`affiliate_products`** - Configuration for all affiliate products and tiers
- **`affiliate_conversions`** - Tracks actual conversions from affiliate networks

## Quick Setup

1. **Install dependencies:**
   ```bash
   cd database
   npm install
   ```

2. **Run the migration:**
   ```bash
   npm run migrate
   ```

3. **Verify the setup:**
   ```bash
   npm run verify
   ```

## Files

- **`affiliate-schema.sql`** - Complete SQL schema with tables, indexes, and initial data
- **`migrate.js`** - Node.js migration script to apply the schema
- **`verify.js`** - Verification script to check the database setup
- **`package.json`** - Dependencies for migration scripts

## Product Tiers

The system includes three tiers of affiliate products:

### Tier 1 (Primary Placement)
- NordVPN - Premium VPN service
- Surfshark VPN - Unlimited device VPN
- Proton Mail - Encrypted email service
- 1Password - Premium password manager
- Bitwarden Premium - Open-source password manager

### Tier 2 (Secondary/Upsell)
- pCloud - Encrypted cloud storage
- Sync.com - Zero-knowledge cloud storage
- DeleteMe - Data broker removal service
- Norton Identity Protection - Identity monitoring

### Tier 3 (Free Funnel Tool)
- Brave Browser - Privacy-focused browser with referral program

## Database Functions

The schema includes helper functions:

- **`get_affiliate_products(category, tier, active_only)`** - Query products by category and tier
- **`affiliate_products_by_tier`** - View showing all products organized by tier

## Environment Variables

Make sure your `.env` file contains:

```
NEON_DATABASE_URL=postgres://user:password@host:5432/dbname
```

## Schema Features

- **GDPR Compliance** - Explicit consent tracking for email leads
- **Performance Optimized** - Comprehensive indexing for fast queries
- **Flexible Product Management** - JSON fields for features and pricing
- **Conversion Tracking** - Support for affiliate network webhooks
- **Session Tracking** - User journey analytics across clicks

## Troubleshooting

### Migration Fails
- Check your `NEON_DATABASE_URL` is correct
- Ensure your database is accessible
- Verify you have CREATE TABLE permissions

### Missing Products
- Run `npm run verify` to check product data
- Products are inserted automatically during migration
- Check the `affiliate_products` table directly

### Performance Issues
- All tables include optimized indexes
- Use the helper functions for complex queries
- Monitor query performance with EXPLAIN ANALYZE

## Next Steps

After running the migration:

1. Test the affiliate tracking function
2. Implement the email capture system  
3. Create the affiliate marketing pages
4. Set up conversion tracking webhooks

The database is now ready to support the full affiliate marketing system!