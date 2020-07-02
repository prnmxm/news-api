const routes = require('express').Router();

const { createNews, getNews, removeNews } = require('../controllers/articles');
const auth = require('../middlewares/auth');
const { createNewsValidation, getNewsValidation, removeNewsValidation } = require('../middlewares/joiArticlesValidation');

routes.post('/articles', createNewsValidation, auth, createNews);
routes.get('/articles', getNewsValidation, auth, getNews);
routes.delete('/articles/:articleId', removeNewsValidation, auth, removeNews);

module.exports = routes;
