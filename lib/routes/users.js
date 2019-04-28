const { Router } = require('express');
const User = require('../models/User');

module.exports = Router() 

  // create
  .post('/', (req, res, next) => {
    const {
      handle,
      name,
      email,
    } = req.body;
    User
      .create({ handle, name, email })
      .then(createdUser => res.send(createdUser))
      .catch(next);
  })

  // get list of all users
  .get('/', (req, res, next) => {
    User
      .find()
      .lean()
      .select({
        __v: false,
        _id: false
      })
      .then(users => {
        res.send(users);
      })
      .catch(next);
  })

  // get a user by id
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .lean()
      .select({
        __v: false,
        _id: false
      })
      .then(user => {
        res.send(user);
      })
      .then(res => {
        return res.send(res);
      })
      .catch(next);
  });
