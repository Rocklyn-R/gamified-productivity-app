const { Pool } = require('pg');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const poolConfig = process.env.NODE_ENV === 'production'
  ? {
    connectionString: process.env.INTERNAL_DATABASE_URL, // Use the DATABASE_URL provided by Render
    ssl: {
      rejectUnauthorized: false, // Required for connecting securely to Render's PostgreSQL
    },
  } : {
    connectionString: process.env.EXTERNAL_DATABASE_URL, // Use the DATABASE_URL provided by Render
    ssl: {
      rejectUnauthorized: false, // Required for connecting securely to Render's PostgreSQL
    },
  }
  
const poolLocalConfig = {
    user: process.env.DB_USER,   // Use local settings
    host: 'localhost',
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
  };

const pool = new Pool(poolConfig);


const query = (text, params, callback) => {
  return pool.query(text, params, callback);
}

module.exports = { query };