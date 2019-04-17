const express = require('express');
const app = express();
const tweetRoutes = require('./routes/tweets');
//const userRoutes = require('./routes/users');

app.use(require('./middleware/logger'));
app.use(express.json());
app.use('/tweets', tweetRoutes);
//app.use('/users', userRoutes);

// this middleware will only run if the one above it doesn't respond
// can handle a bad request
app.use(require('./middleware/not-found'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
