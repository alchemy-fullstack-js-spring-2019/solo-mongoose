const User = require('../models/User');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      email
    } = req.body;

    User
      .create({ handle, email })
      .then(createdUser => res.send(createdUser))
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
      .then(users => res.send(users))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      handle,
      email
    } = req.body;

    User
      .findByIdAndUpdate(id, { handle, email })
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;

    User
      .findByIdAndDelete(id.id)
      .then(res.send({ deleted: 1 }))
      .catch(next);
  });
