const routes = require('express').Router();

const auth = require('./auth');
const user = require('./user');
const article = require('./article');
const other = require('./other');

routes.use(auth);
routes.use(user);
routes.use(article);
routes.use(other);

module.exports = routes;
