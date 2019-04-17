const express = require('express');
const app = express();

app.use(express.json());

app.use('/tweets', require('./routes/tweets'));
app.use('/dogs', require('./routes/dogs'));

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
