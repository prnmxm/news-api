const routes = require('express').Router();
const { profile } = require('../controllers/users');

const auth = require('../middlewares/auth');
const { profileValidation } = require('../middlewares/joiUserValidation');

routes.get('/user/me', profileValidation, auth, profile);

module.exports = routes;
