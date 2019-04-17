const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweet');
const UsersRoute = require('./routes/user');

app.use(express.json());
app.use('/tweets', tweetsRoutes);
app.use('/users', UsersRoute);

module.exports = app;
