const express = require('express');
const app = express();
const { parse } = require('url');
const tweetRouter = require('../lib/routes/tweet');
const userRouter = require('../lib/routes/user');

app.use(express.json());

app.use('/tweets', tweetRouter);
app.use('/users', userRouter);

module.exports = app;
