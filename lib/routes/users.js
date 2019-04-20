const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      description,
      color,
      condition
    } = req.body;

    User
      .create({ name, description, color, condition })
      .then(createdUser => res.send(createdUser))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    User
      .find()
      .lean()
      .select({
        __v: false
      })
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    User
      .findById(id)
      .lean()
      .select({
        __v: false
      })
      .then(user => res.send(user))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      description,
      color,
      condition
    } = req.body;
    User
      .findByIdAndUpdate(id, { name, description, color, condition }, { new: true })
      .lean()
      .select({
        __v: false
      })
      .then(user => res.send(user))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    User
      .findByIdAndDelete(id)
      .lean()
      .select({
        __v: false
      })
      .then(deletedUser => res.send(deletedUser))
      .catch(next);
  });
