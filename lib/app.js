const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tweetsToys = require('./routes/toys');

app.use(express.json());

app.use('/tweets', tweetsRoutes);
app.use('/toys', tweetsToys);

/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
