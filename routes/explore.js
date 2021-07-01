/** @format */

const { explore, describe } = require('../controllers/explorationController');

module.exports = (app) => {
  app.get('/api/explore/:libelle', explore);
  app.get('/api/describe/:libelle', describe);
};
