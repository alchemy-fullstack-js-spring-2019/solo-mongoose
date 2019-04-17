const express = require('express');
const app = express();
const tweetRoutes = require('./routes/tweets');
const userRoutes = require('./routes/users');

app.use(express.json());
app.use('/tweets', tweetRoutes);
app.use('/users', userRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
