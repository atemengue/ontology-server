/** @format */

const SolrNode = require('solr-node');

const solr = new SolrNode({
  host: '127.0.0.1',
  port: '8983',
  core: 'food',
  protocol: 'http',
});

module.exports = { solr };
