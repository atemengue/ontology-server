/** @format */

const { getAliments, getAliment } = require('../controllers/AlimentController');

module.exports = (app) => {
  app.get('/api/aliments', getAliments);
  app.get('/api/aliments/:name', getAliment);
};
