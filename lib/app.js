const express = require('express');
const app = express();

app.use(express.json());
//so use the express.json method on all incoming requests

app.use('/tweets', require('./routes/tweetRoutes.js'));
//so for all CRUD functionality at the /tweets path, use the routes made in that file

module.exports = app;
