const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const userRoutes = require('../lib/routes/users');

app.use(express.json());
app.use('/tweets', tweetsRoutes);
app.use('/users', userRoutes);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error-handler'));


module.exports = app;
