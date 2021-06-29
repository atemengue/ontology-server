/** @format */

const { getAliments } = require('../controllers/AlimentController');

module.exports = (app) => {
  app.get('/api/aliments', getAliments);
};
