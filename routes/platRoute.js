/** @format */

const {
  addPlat,
  chefRecommendation,
} = require('../controllers/platController');
module.exports = (app) => {
  app.post('/api/plats', addPlat);
  app.post('/api/plats/chef', chefRecommendation);
};
