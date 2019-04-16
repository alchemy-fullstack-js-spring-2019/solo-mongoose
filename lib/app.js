const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('hi');
});

app.use('/fweet', require('./routes/fweets'));

module.exports = app;
