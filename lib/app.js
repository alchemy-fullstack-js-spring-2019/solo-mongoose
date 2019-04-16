const express = require('express');
const app = express();
const { parse } = require('url');
const tweetRouter = require('../lib/routes/tweet');

app.use(express.json());

app.use('/tweets', tweetRouter);

module.exports = app;
