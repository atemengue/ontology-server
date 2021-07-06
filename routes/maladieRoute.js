/** @format */

const {
  getMaladie,
  maladieRecommendation,
} = require('../controllers/maladieController');

module.exports = (app) => {
  app.post('/api/maladies', maladieRecommendation);
  app.get('/api/maladies/:etat', getMaladie);
};
