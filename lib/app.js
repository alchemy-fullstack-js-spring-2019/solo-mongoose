const express = require('express');

const app = express();

app.use(express.json());

app.use('/dogs', require('./routes/dogs'));
app.use('/users', require('./routes/users'));

module.exports = app;
