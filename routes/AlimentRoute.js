/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');
const {
  getAliments,
  getAliment,
  addAliment,
} = require('../controllers/AlimentController');

module.exports = (app) => {
  app.get('/api/aliments', getAliments);
  app.get('/api/aliments/:name', getAliment);
  app.post('/api/aliments', addAliment);
};
