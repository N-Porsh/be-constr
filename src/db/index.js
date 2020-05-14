const {Pool} = require('pg');
const named = require('node-postgres-named');
const dbConfig = require('../config').db;

const pool = new Pool({
    connectionString: dbConfig.connectionString,
    max: dbConfig.max,
    idleTimeoutMillis: dbConfig.idleTimeoutMillis
});
named.patch(pool);

pool.on('error', (err, client) => {
    console.error('Error:', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool: pool
}
