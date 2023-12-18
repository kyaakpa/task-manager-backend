const pg = require("pg");
require("dotenv").config();

const config = {
  user: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  ssl: true,
};

module.exports = config;
