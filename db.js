const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

module.exports = pool;
