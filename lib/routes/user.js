const { Router } = require('express');
const userSchema = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      name,
      email
    } = req.body;

    userSchema
      .create({ handle, name, email })
      .then(newUser => res.send(newUser))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    userSchema
      .find()
      .then(tweets => res.send(tweets))
      .catch(err => {
        next(err);
      });
  })

