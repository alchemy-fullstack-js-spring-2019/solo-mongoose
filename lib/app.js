const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

app.use(require('./middleware/logger'));

app.use(require('./middleware/not-found'));

app.use(express.json());

app.use('/tweets', tweetsRoutes);

module.exports = { app };
