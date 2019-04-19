const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweet');
const UsersRoute = require('./routes/user');

app.use(express.json());
app.use('/tweets', tweetsRoutes);
app.use('/users', UsersRoute);

app.use(require('./middlewear/not-found'));

// eslint-disable-next-line 
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
