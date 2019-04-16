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
      .then(listOfUsers => res.send(listOfUsers))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(foundUser => res.send(foundUser))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { email: req.body.email }, { new: true })
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  });
