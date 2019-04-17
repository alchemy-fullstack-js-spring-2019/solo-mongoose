const express = require('express');

const app = express();

app.use(express.json());
app.use(require('./middleware/logger'));
app.use('/pirates', require('./routes/pirates'));


module.exports = app;