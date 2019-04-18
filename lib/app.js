const express = require('express');

const app = express();

app.use(express.json());

app.use('/tweets', require('./routes/tweets'));
app.use('/users', require('./routes/users'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
