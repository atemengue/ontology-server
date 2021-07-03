/** @format */

const { stats } = require('../controllers/statistiqueController');

module.exports = (app) => {
  app.get('/api/stats', stats);
};
