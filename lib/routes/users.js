const User = require('../models/User');
const Router = require('express');

module.exports = Router() 
  .post('/', (req, res, next) => {
    const {
      handle,
      name,
      email
    } = req.body;
    User
      .create({ handle, name, email })
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
      .then(foundUser => res.send(foundUser))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      handle,
      name
    } = req.body;
    User 
      .findByIdAndUpdate(id, { handle, name }, { new: true })
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    User
      .findByIdAndDelete(id)
      .then(deletedUser => res.send(deletedUser))
      .catch(next);
  });
