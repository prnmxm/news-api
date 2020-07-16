const express = require('express');

const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');

const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const limiter = require('./middlewares/limiter');

const mongoUri = config.MONGODB;
mongoose.connect(mongoUri, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(limiter);
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errorHandler);

app.listen(config.PORT);
