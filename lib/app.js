const express = require('express');
const userRoute = require('../lib/routes/user');

const app = express();

//Body Parser
app.use(express.json());

//user route
app.use('/users', userRoute);

module.exports = app;
