const express = require('express');
const app = express();
const tweetsRoutes = require('../lib/routes/tweets');
const dogsRoutes = require('../lib/routes/dogs');

app.use(express.json());
app.use('/tweets', tweetsRoutes);
app.use('/dogs', dogsRoutes);
module.exports = app;
