// model
const Article = require('../models/article');

// Errors
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const errors = require('../errorsMSG/errors');

module.exports.createNews = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const article = await Article.create({
      keyword, title, text, date, source, link, image, owner: userId,
    });
    res.status(201).send(article.ownerPrivate());
  } catch (e) {
    next(e);
  }
};
module.exports.getNews = async (req, res, next) => {
  try {
    const userId = req.user;
    const articles = await Article.find({ owner: userId });
    res.status(200).send(articles);
  } catch (e) {
    next(e);
  }
};
module.exports.removeNews = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId).populate('owner').orFail(() => new NotFound(errors.NOT_FOUND));
    if (!article.owner.equals(req.user._id)) throw new Forbidden(errors.FORBIDDEN);
    await article.remove();
    res.status(200).send(article.ownerPrivate());
  } catch (e) {
    next(e);
  }
};
