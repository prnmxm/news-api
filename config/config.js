require('dotenv').config();

const {
  PORT, NODE_ENV, MONGODB, JWT_SECRET,
} = process.env;
const config = {
  NODE_ENV: NODE_ENV === 'production' ? 'production' : 'develop',
  PORT: PORT || 3000,
  MONGODB: NODE_ENV === 'production' ? MONGODB : 'mongodb://localhost:27017/test',
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'develop_secret',
};
module.exports = config;
 
