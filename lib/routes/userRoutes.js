const { Router } = require('express');
const UserSchema = require('../models/userSchema');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      email
    } = req.body;

    UserSchema
      .create({
        handle,
        email
      })
      .then(createdUser => res.send(createdUser))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    UserSchema
      .find()
      .then(usersArray => res.send(usersArray))
      .catch(next);
  });
 
