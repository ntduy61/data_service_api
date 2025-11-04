const mysqlService = require('./mysqlService');
const mssqlService = require('./mssqlService');
const pgService = require('./pgService');
const oracleService = require('./oracleService');

require('dotenv').config();


function createDBService(){
    const dbType = process.env.DB_TYPE;
    switch (dbType){
        case 'mysql':
            return mysqlService;
        case 'mssql':
            return mssqlService;
        case 'pg':
            return pgService;
        case 'oracle':
            return oracleService;
        default:
            throw new Error(`Unsupported db_type: ${dbType}`);
    }
}
module.exports = createDBService();