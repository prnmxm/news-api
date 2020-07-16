const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// errors
const Unauthorized = require('../errors/Unauthorized');
const errors = require('../errorsMSG/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
    unique: [true, errors.CONFLICT_ERROR],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => errors.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
  },
  name: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
    minlength: [2, errors.MIN_FIELD_LENGTH],
    maxlength: [30, errors.MAX_FIELD_LENGTH],
  },
}, { versionKey: false });
userSchema.methods.passwordPrivate = function () {
  const obj = ({ password, ...data }) => data;
  return obj(this.toObject());
};
userSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) throw new Unauthorized(errors.NOT_VALID_DATA);
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) throw new Unauthorized(errors.NOT_VALID_DATA);
    return user;
  } catch (e) {
    return Promise.reject(e);
  }
};
module.exports = mongoose.model('User', userSchema);
