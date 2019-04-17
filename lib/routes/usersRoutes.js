const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      nickname,
      name,
      email
    } = req.body;

    User 
      .create({ nickname, name, email })
      .then(newUser => res.send(newUser))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    User
      .findById(id)
      .then(user => res.send(user))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      nickname,
      name,
      email
    } = req.body;
    User
      .findByIdAndUpdate(id, { nickname, name, email }, { new: true })
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    User
      .findByIdAndDelete(id)
      .then(deleted => res.send(deleted))
      .catch(err => next(err));
  });
