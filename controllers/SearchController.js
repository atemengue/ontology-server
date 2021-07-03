/** @format */

const { solr } = require('../config/SolrProvider');

/** @format */

const getDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

exports.searchData = async (req, res, next) => {
  let term = req.params.term;

  const start = process.hrtime();

  var request = await solr.query().q(`object:${term} || subject:${term}`);

  var time = Date.now();
  let response = await solr.search(request);

  let first = response.response.docs.find((x) => {
    return x.predicat[0] === 'http://www.w3.org/2000/01/rdf-schema#label';
  });

  let second = response.response.docs.filter((x) => {
    return x.predicat[0] === 'http://www.w3.org/2000/01/rdf-schema#label';
  });

  setTimeout(() => {
    res.json({
      single: first,
      response: second,
      time: getDurationInMilliseconds(start),
    });
  }, 1000);
};
