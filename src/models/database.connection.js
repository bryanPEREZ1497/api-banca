const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1497pm',
    database: 'Banco',
    port: '5432'
});

module.exports=pool;