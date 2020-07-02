const routes = require('express').Router();

const { signUp, signIn } = require('../controllers/users');
const { signInValidation, singUpValidation } = require('../middlewares/joiUserValidation');

routes.post('/signup', singUpValidation, signUp);
routes.post('/signin', signInValidation, signIn);

module.exports = routes;
