/** @format */

const ConfigApiRoutes = (app) => {
  require('../routes/index')(app);
  require('../routes/users')(app);
  require('../routes/classRoute')(app);
};

module.exports = ConfigApiRoutes;
