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
      .select({
        __v: false,
      })
      .lean()
      .then(users => res.send(users))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    User
      .findById(id)
      .select({
        __v: false,
      })
      .lean()
      .then(user => res.send(user))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      nickname,
      name,
      email
    } = req.body;
    
    if(!name && !email) {
      User
        .findByIdAndUpdate(id, { nickname }, { new: true })
        .select({
          __v: false,
        })
        .lean()
        .then(updatedUser => res.send(updatedUser))
        .catch(next);
    } else if(!nickname && !email) {
      User
        .findByIdAndUpdate(id, { name }, { new: true })
        .select({
          __v: false,
        })
        .lean()
        .then(updatedUser => res.send(updatedUser))
        .catch(next);
    } else if(!name && !nickname) {
      User
        .findByIdAndUpdate(id, { email }, { new: true })
        .select({
          __v: false,
        })
        .lean()
        .then(updatedUser => res.send(updatedUser))
        .catch(next);
    } else if(!nickname) {
      User
        .findByIdAndUpdate(id, { name, email }, { new: true })
        .select({
          __v: false,
        })
        .lean()
        .then(updatedUser => res.send(updatedUser))
        .catch(next);
    } else if(!name) {
      User
        .findByIdAndUpdate(id, { nickname, email }, { new: true })
        .select({
          __v: false,
        })
        .lean()
        .then(updatedUser => res.send(updatedUser))
        .catch(next);
    } else if(!email) {
      User
        .findByIdAndUpdate(id, { nickname, name }, { new: true })
        .select({
          __v: false,
        })
        .lean()
        .then(updatedUser => res.send(updatedUser))
        .catch(next);
    } else {
      User
        .findByIdAndUpdate(id, { nickname, name, email }, { new: true })
        .select({
          __v: false,
        })
        .lean()
        .then(updatedUser => res.send(updatedUser))
        .catch(next);
    }
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    User
      .findByIdAndDelete(id)
      .select({
        __v: false,
      })
      .lean()
      .then(deleted => res.send(deleted))
      .catch(err => next(err));
  });
