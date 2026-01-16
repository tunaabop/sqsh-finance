/* Connection setup for PostgreSQL database using pg library, connect express to PostgreSQL */ 
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:  process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false, // for local development; set to true for production with proper SSL configuration
    // important since pg doesn't always auto-detect environment, so we manually set ssl to false for local dev 
    // for deployment, consider using: ssl: { rejectUnauthorized: false }
});

module.exports = pool;