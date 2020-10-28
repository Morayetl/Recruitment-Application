import { Connection, MysqlError } from "mysql";
import { pinoLogger } from "utils/pino-logger";
import { MYSQL_PASSWORD } from "utils/Constants";

const logger = pinoLogger;


const mysql      = require('mysql');
const connection: Connection = mysql.createPool({
  host     : process.env.MYSQL_HOST ? process.env.MYSQL_HOST : 'localhost',
  port     : '3306',
  user     : 'root',
  password : MYSQL_PASSWORD,
  database : 'A',
  charset : 'utf8'
});

/*
connection.on('connection', function (connection) {
  console.log('sql pool has connected');
});
*/
export default connection;
