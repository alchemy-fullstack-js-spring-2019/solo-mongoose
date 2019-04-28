const express = require('express');
const app = express();

app.use(express.json());

app.use('/tweets', require('./routes/tweets'));
app.use('/users', require('./routes/users'));

module.exports = app;
