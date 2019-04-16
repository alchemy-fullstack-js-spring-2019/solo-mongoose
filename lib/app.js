const express = require('express');

const app = express();

app.use(express.json());

app.use('/pirates', require('./routes/pirates'));


module.exports = app;