/** @format */

const { register, login } = require('../controllers/UserController');

module.exports = (app) => {
  app.post('/api/register', register);
  app.post('/api/login', login);
};
