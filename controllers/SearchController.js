/** @format */

const { solr } = require('../config/SolrProvider');

/** @format */

exports.searchData = async (req, res, next) => {
  var { query } = req.query; // $_GET["id"]

  var request = await solr.query().q(`subject:${query} || subject:${query}`);

  var time = Date.now();
  let response = await solr.search(request);

  res.json(response);
};
