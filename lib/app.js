const express = require('express');
const app = express();

app.use(express.json());

app.use('/fweet', require('./routes/fweets'));

module.exports = app;
