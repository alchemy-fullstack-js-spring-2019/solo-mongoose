const express = require('express');
const app = express();
const tweetsRoutes = require('../lib/routes/tweets');
const dogsRoutes = require('../lib/routes/dogs');
const userRoutes = require('../lib/routes/users');

app.use(express.json());
app.use('/tweets', tweetsRoutes);
app.use('/dogs', dogsRoutes);
app.use('/users', userRoutes);
app.use(require('./middleware/notFound'));
app.use(require('./middleware/error'));

module.exports = app;
