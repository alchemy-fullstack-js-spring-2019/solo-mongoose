const express = require('express');
const app = express();
const tweetRoutes = require('./routes/tweets');

app.use(express.json());
app.use('/tweets', tweetRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
