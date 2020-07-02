const { celebrate, Joi } = require('celebrate');
// errors
const errors = require('../errorsMSG/errors');

const celebrateOptions = { abortEarly: false };

const headers = {
  headers: Joi.object().keys({
    cookie: Joi.string().required().messages({
      'any.required': errors.UNAUTHORIZED,
    }),
  }).unknown(true),
};

const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: true,
  allowUnicode: false,
}).required().messages({
  'string.empty': errors.EMPTY_FIELD,
  'any.required': errors.REQUIRED_FIELD,
  'string.email': errors.INVALID_EMAIL,
});

const password = Joi.string().min(6).required().messages({
  'sting.base': errors.NOT_STRING,
  'string.min': errors.MIN_FIELD_LENGTH,
  'any.required': errors.REQUIRED_FIELD,
  'string.empty': errors.EMPTY_FIELD,
});

const name = Joi.string().min(2).max(30).required()
  .messages({
    'string.empty': errors.EMPTY_FIELD,
    'sting.base': errors.NOT_STRING,
    'string.min': errors.MIN_FIELD_LENGTH,
    'string.max': errors.MAX_FIELD_LENGTH,
    'any.required': errors.REQUIRED_FIELD,
  });

const singUpValidation = celebrate({
  body: Joi.object().keys({
    email,
    password,
    name,
  }),
}, celebrateOptions);

const signInValidation = celebrate({
  body: Joi.object().keys({
    email,
    password,
  }),
}, celebrateOptions);
const profileValidation = celebrate({
  ...headers,
}, celebrateOptions);

module.exports = {
  signInValidation,
  singUpValidation,
  profileValidation,
};
