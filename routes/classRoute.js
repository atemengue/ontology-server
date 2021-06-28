/** @format */

const { getAllClasses } = require('../controllers/classController');

module.exports = (app) => {
  app.get('/api/classes', getAllClasses);
};
