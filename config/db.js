const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'Gamified_ToDo',
    password: 'newpassword',
    port: 5432,
})

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
}

module.exports = { query };