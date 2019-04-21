const express = require('express');
const logger = require('./middleware/logger');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger(req, res);
  next();
});

app.use('/tweets', require('./routes/tweets'));
app.use('/users', require('./routes/users'));

module.exports = app;


