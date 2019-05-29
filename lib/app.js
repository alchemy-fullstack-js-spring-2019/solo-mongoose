const express = require('express');
const app = express();
const tweetsRouter = require('./routes/tweetsRouter');
const usersRouter = require('../lib/routes/usersRouter');


app.use(express.json());
app.use('/tweets', tweetsRouter);
app.use('/users', usersRouter);

app.use((err, req, res) => {
  res.status(500).send({ error: err });
});


module.exports = app;
