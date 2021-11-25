const pg = require("pg");

const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres",
  host: "dbbooks.cdx6xohco5aw.us-east-1.rds.amazonaws.com",
  database: "books",
  password: "sqladmin",
  port: 5432,
});

module.exports = { pool };
