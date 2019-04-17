const express = require('express');
const app = express();
const ninjasRoutes = require('./routes/ninjasRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use(express.json());
app.use('/ninjas', ninjasRoutes);
app.use('/users', usersRoutes);

module.exports = app;
