const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
// errors
const BadRequest = require('../errors/BadRequest');
const errors = require('../errorsMSG/errors');

const celebrateOptions = { abortEarly: false };
const linkValidator = (value) => {
  if (!validator.isURL(value)) {
    return new BadRequest(errors.INVALID_URL);
  }
  return value;
};
const headers = {
  headers: Joi.object().keys({
    cookie: Joi.string().required().messages({
      'any.required': errors.UNAUTHORIZED,
    }),
  }).unknown(true),
};
const title = Joi.string().required().messages({
  'sting.base': errors.NOT_STRING,
  'any.required': errors.REQUIRED_FIELD,
  'string.empty': errors.EMPTY_FIELD,
});
const text = Joi.string().required().messages({
  'sting.base': errors.NOT_STRING,
  'any.required': errors.REQUIRED_FIELD,
  'string.empty': errors.EMPTY_FIELD,
});
const date = Joi.string().required().messages({
  'sting.base': errors.NOT_STRING,
  'any.required': errors.REQUIRED_FIELD,
  'string.empty': errors.EMPTY_FIELD,
});
const keyword = Joi.string().required().messages({
  'sting.base': errors.NOT_STRING,
  'any.required': errors.REQUIRED_FIELD,
  'string.empty': errors.EMPTY_FIELD,
});
const source = Joi.string().required().messages({
  'sting.base': errors.NOT_STRING,
  'any.required': errors.REQUIRED_FIELD,
  'string.empty': errors.EMPTY_FIELD,
});
const link = Joi.string().required().custom(linkValidator, 'link validation').messages({
  'sting.base': errors.NOT_STRING,
  'any.required': errors.REQUIRED_FIELD,
  'string.empty': errors.EMPTY_FIELD,
});
const image = Joi.string().required().custom(linkValidator, 'link validation').messages({
  'sting.base': errors.NOT_STRING,
  'any.required': errors.REQUIRED_FIELD,
  'string.empty': errors.EMPTY_FIELD,
});

const createNewsValidation = celebrate({
  body: Joi.object().keys({
    title,
    text,
    date,
    keyword,
    source,
    link,
    image,
  }),
  ...headers,
}, celebrateOptions);

const getNewsValidation = celebrate({
  ...headers,
}, celebrateOptions);

const removeNewsValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
  ...headers,
}, celebrateOptions);

module.exports = {
  createNewsValidation,
  getNewsValidation,
  removeNewsValidation,
};
