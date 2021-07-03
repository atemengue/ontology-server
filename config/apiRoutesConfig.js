/** @format */

const ConfigApiRoutes = (app) => {
  require('../routes/index')(app);
  require('../routes/users')(app);
  require('../routes/classRoute')(app);
  require('../routes/AlimentRoute')(app);
  require('../routes/explore')(app);
  require('../routes/searchRoute')(app);
  require('../routes/statistiqueRoute')(app);
  require('../routes/userRoute')(app);
};

module.exports = ConfigApiRoutes;
