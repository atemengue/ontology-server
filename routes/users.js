/** @format */

var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = (app) => {
  app.get('/api/users', function (req, res, next) {
    res.status(201).send('LES USERS');
  });
};
