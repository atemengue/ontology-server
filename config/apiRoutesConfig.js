/** @format */

const ConfigApiRoutes = (app) => {
  require('../routes/index')(app);
  require('../routes/users')(app);
  require('../routes/classRoute')(app);
  require('../routes/AlimentRoute')(app);
  require('../routes/searchRoute')(app);
};

module.exports = ConfigApiRoutes;
