/** @format */

const { addPlat } = require('../controllers/platController');
module.exports = (app) => {
  app.post('/api/plats', addPlat);
};
