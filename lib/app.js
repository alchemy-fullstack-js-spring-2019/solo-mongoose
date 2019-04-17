const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const userRoutes = require('./routes/users');

app.use(require('./middleware/logger'));

app.use(express.json());

app.use('/users', userRoutes);

app.use('/tweets', tweetsRoutes);

app.use(require('./middleware/not-found'));

module.exports = { app };
