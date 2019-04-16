const express = require('express');
const app = express();
const ninjasRoutes = require('./routes/ninjasRoutes');

app.use(express.json());
app.use('/ninjas', ninjasRoutes);

module.exports = app;
