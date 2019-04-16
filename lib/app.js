const express = require('express');

const app = require('app');

app.use(express.json());

app.use('/pirates', require('./routes/pirates'));


module.exports = app;