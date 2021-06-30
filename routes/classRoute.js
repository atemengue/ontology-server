/** @format */

const { getAllClasses, getClasse } = require('../controllers/classController');

module.exports = (app) => {
  app.get('/api/classes', getAllClasses);

  app.get('/api/classes/:nameClasse', getClasse);
};
