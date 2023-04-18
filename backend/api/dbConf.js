const Pool = require("mysql").createPool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

module.exports = pool;
