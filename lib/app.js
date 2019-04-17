const express = require('express');
const app = express();

app.use(express.json());

app.use('/tweets', require('./routes/tweets'));

app.get('/', (req, res) => {
  res.end('hi');
});

module.exports = app;
