const { Router } = require('express');
const userSchema = require('../models/User');

module.exports = Router()
  .post('/users', (req, res, next) => {
    const {
      handle,
      name,
      email
    } = req.body;

    userSchema
      .create({ handle, name, email })
      .then(newUser => res.send(newUser))
      .catch(next);
  });
