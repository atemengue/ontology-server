/** @format */

const { explore } = require('../controllers/explorationController');

module.exports = (app) => {
  app.get('/api/explore/:libelle', explore);
};
