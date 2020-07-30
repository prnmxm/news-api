const routes = require('express').Router();

const { signUp, signIn, logout } = require('../controllers/users');
const { signInValidation, singUpValidation, profileValidation } = require('../middlewares/joiUserValidation');
const auth = require('../middlewares/auth');
routes.post('/signup', singUpValidation, signUp);
routes.post('/signin', signInValidation, signIn);
routes.get('/logout', profileValidation, logout);

module.exports = routes;
