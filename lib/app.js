const express = require('express');
const app = express();
const tweetsRouter = require('./routes/tweetsRouter');


app.use(express.json());
app.use('/tweets', tweetsRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});


module.exports = app;
