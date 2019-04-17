const express = require('express');
const app = express();

app.use(express.json());
app.use('/dogs', require('./routes/dogs'));
app.use('/owners', require('./routes/owners'));

module.exports = app;
