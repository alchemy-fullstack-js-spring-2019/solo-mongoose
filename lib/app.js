const express = require('express');
const app = express();

app.use(express.json());

app.use('/tweet', require('./routes/tweet'));

module.exports = app;
