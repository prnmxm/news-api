const routes = require('express').Router();
const errors = require('../errorsMSG/errors');
const BadRequest = require('../errors/BadRequest');

routes.use('*', (req, res, next) => {
  const error = new BadRequest(errors.NOT_FOUND);
  next(error);
});

module.exports = routes;
