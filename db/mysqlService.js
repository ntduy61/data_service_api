const mysql = require("mysql2/promise");
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10
});

async function executeSP(spName, params = {}) {
    const values = Object.values(params);
    const paramSP = values.map(()=>'?').join(',');

    const [rows] = await pool.query(`CALL ${spName}(${paramSP})`, values);

    const cleanResults = rows.filter(
        r => Array.isArray(r) && r.length >= 0
    );

    return cleanResults;
}
module.exports = {executeSP};