const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

app.use(express.json());

app.use('/tweets', tweetsRoutes);

module.exports = app;
