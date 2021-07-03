/** @format */

const { searchData } = require('../controllers/SearchController');

module.exports = (app) => {
  app.get('/api/search/:term', searchData);
};
