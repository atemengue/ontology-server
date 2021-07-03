/** @format */

const { Client } = require('pg');

const psql = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'ontology',
});

const connection = async () => {
  return await psql.connect();
};

const pgClient = connection();

module.exports = { pgClient };
