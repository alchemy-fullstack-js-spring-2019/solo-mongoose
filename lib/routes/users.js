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
      .select({
        __v: false
      })
      .lean()
      .then(foundUsers => res.send(foundUsers))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(foundUser => res.send(foundUser))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    User
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    User
      .findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(deletedUser => res.send(deletedUser))
      .catch(next);
  });
