const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    User.create({
      handle: req.body.handle,
      name: req.body.name,
      email: req.body.email
    })
      .then(user => res.send(user))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    User.find()
      .lean()
      .select({ __v: false })
      .then(listOfUsers => res.send(listOfUsers))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .lean()
      .select({ __v: false })
      .then(foundUser => res.send(foundUser))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { email: req.body.email }, { new: true })
      .lean()
      .select({ __v: false })
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
      .lean()
      .select({ __v: false })
      .then(deletedUser => res.send(deletedUser))
      .catch(next);
  });
