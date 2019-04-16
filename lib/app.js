const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

app.use(express.json());

app.use('/tweets', tweetsRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
