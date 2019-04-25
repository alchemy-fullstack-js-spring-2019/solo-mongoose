const express = require('express');
const app = express();

//why isnt this /tweets
app.get('/', (req, res) => {
  res.end('hi');
});

app.use(express.json());
//so use the express.json method on all incoming requests

app.use('/tweets', require('./routes/tweetRoutes.js'));
//so for all CRUD functionality at the /tweets path, use the routes made in that file

app.use('/users', require('./routes/userRoutes.js'));

module.exports = app;
