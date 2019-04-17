const express = require('express');
const userRoute = require('../lib/routes/user');
const tweetRoute = require('../lib/routes/tweet');
const app = express();

//Body Parser
app.use(express.json());

//user route
app.use('/users', userRoute);

//tweet route
app.use('/tweets', tweetRoute);

module.exports = app;
