const mongoose = require('mongoose');
const { isCelebrate } = require('celebrate');

// errors
const BadRequest = require('../errors/BadRequest');
const locale = require('../errorsMSG/locale');

const errorHandler = (err, req, res, next) => {
  let error;
  if (err instanceof mongoose.Error) {
    const msg = Object.values(err.errors).map((e) => `${e.properties.path}: ${locale.errors[e.properties.message]}`).join('. ');
    error = new BadRequest(msg);
  } else if (isCelebrate(err)) {
    const msg = Object.values(err.joi.details).map((e) => `${e.path[0]}: ${locale.errors[e.message] || 'undefined field'}`).join('. ');
    error = new BadRequest(msg);
  } else {
    error = new Error();
    error.statusCode = err.statusCode ? err.statusCode : 500;
    error.message = error.statusCode === 500
      ? locale.errors.SERVERERROR : locale.errors[err.message] || err.message;
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
