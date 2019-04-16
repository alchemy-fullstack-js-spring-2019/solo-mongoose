const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const userRoutes = require('../lib/routes/users');

app.use(express.json());
app.use('/tweets', tweetsRoutes);
app.use('/users', userRoutes);

module.exports = app;
