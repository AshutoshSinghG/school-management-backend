const mysql = require('mysql2/promise');
const env = require('./env');

const pool = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
});

const testConnection = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.ping();
        console.log(`✓ MySQL connected — ${env.db.host}:${env.db.port}/${env.db.database}`);
    } catch (error) {
        console.error('✗ MySQL connection failed:', error.message);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const shutdown = async () => {
    try {
        await pool.end();
        console.log('✓ MySQL pool closed');
    } catch (error) {
        console.error('✗ Error closing MySQL pool:', error.message);
    }
};

module.exports = { pool, testConnection, shutdown };
