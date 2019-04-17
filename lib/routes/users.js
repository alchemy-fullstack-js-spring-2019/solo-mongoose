const { Router } = require('express');
const User = require('../models/User');

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
  })
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .then(foundUser => res.send(foundUser))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    User
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    User
      .findByIdAndDelete(req.params.id)
      .then(deletedUser => res.send(deletedUser))
      .catch(next);
  });
