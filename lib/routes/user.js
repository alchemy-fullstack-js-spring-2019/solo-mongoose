const User = require('../models/User');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, name, email } = req.body;
    User
      .create({ handle, name, email })
      .then(createdUser => res.send(createdUser))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    User
      .find()
      .then(foundUsers => res.send(foundUsers))
      .catch(next);
  });
