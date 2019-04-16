const express = require('express');

const app = express();

app.use('/fweet', require('./routes/fweets'));

module.exports = app;
