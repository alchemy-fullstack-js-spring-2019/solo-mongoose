const express = require('express');

const app = express();

app.use(express.json());
app.use(require('./middleware/logger'));
app.use('/ships', require('./routes/ships'));
app.use('/pirates', require('./routes/pirates'));
app.use(require('./middleware/not-found'));

module.exports = app;
