const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "110390",
    database: "data_service_api",
    waitForConnections: true,
    connectionLimit: 10
});
module.exports =  pool;