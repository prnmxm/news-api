const mongoose = require('mongoose');
const validator = require('validator');

// errors
const errors = require('../errorsMSG/errors');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
  },
  text: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
  },
  date: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
  },
  keyword: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
  },
  source: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
  },
  link: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
    validate: {
      validator: (v) => validator.isURL(v),
      message: () => errors.INVALID_URL,
    },
  },
  image: {
    type: String,
    required: [true, errors.REQUIRED_FIELD],
    validate: {
      validator: (v) => validator.isURL(v),
      message: () => errors.INVALID_URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    select: false,
  },
}, { versionKey: false });
articleSchema.methods.ownerPrivate = function () {
  const obj = ({ owner, ...data }) => data;
  return obj(this.toObject());
};
module.exports = mongoose.model('Article', articleSchema);
