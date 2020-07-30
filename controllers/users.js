// Model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = require('../config/config');

// Errors
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const errors = require('../errorsMSG/errors');

module.exports.signUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) throw new Conflict(errors.CONFLICT_EMAIL);
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hashPassword, name });
    res.status(201).send(user.passwordPrivate());
  } catch (e) {
    next(e);
  }
};
module.exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const secret = JWT_SECRET;
    const token = jwt.sign({ _id: user._id }, secret, {
      expiresIn: '7d',
    });
    res.cookie('jwt', token, {
      maxAge: 24 * 60 * 60 * 1000 * 7,
      httpOnly: true,
    });
    res.status(200).send(user.passwordPrivate());
  } catch (e) {
    next(e);
  }
};
module.exports.profile = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).orFail(new NotFound(errors.NOT_FOUND));
    if (!user) throw new NotFound(errors.NOT_FOUND);
    res.status(200).send(user.passwordPrivate());
  } catch (e) {
    next(e);
  }
};
module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.status(200).send();
  } catch (e) {
    next(e);
  }
};
