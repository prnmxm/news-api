const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// errors
const Unauthorized = require('../errors/Unauthorized');
const errors = require('../errorsMSG/errors');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new Unauthorized(errors.UNAUTHORIZED);
    const secret = JWT_SECRET;
    const payload = await jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new Unauthorized(errors.UNAUTHORIZED);
      }
      return decoded;
    });
    req.user = payload;
    next();
  } catch (e) {
    next(e);
  }
};
