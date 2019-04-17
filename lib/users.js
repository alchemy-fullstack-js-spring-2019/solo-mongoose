const express = require('express');
const users = express;
const usersRouter = require('../lib/routes/usersRouter');

users.use(express.json());
users.use('/users', usersRouter);

// users.use((err, req, res) => {
//   res.status(500).send({ error: err });
// });


module.exports = users;
