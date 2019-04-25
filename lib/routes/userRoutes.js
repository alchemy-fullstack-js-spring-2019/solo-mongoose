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
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params; //why not req.body ?? because were grabbing it from the URL, which we assign in the test when we say .get(`/users/${createdUser._id}`);
    UserSchema
      .findById(id)
      .then(foundUser => res.send(foundUser))
      .catch(next);
  });
 
