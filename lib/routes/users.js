const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next)=> {
    const {
      handle,
      name,
      email
    } = req.body;

    User
      .create({ handle, name, email })
      .then(createdUser => {
        res.send(createdUser);
      })
      .catch(next);
  })
  
  .get('/', (req, res, next)=> {
    User
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(users=> res.send(users))
      .catch(next);
  })

  .get('/:id', (req, res, next)=> {
    const { id } = req.params;
    User
      .findById(id)
      .select({
        __v: false
      })
      .lean()
      .then(user=> res.send(user))
      .catch(next);
  })

  .put('/:id', (req, res, next)=> {
    const { id } = req.params;
    const {
      handle,
      name,
      email
    } = req.body;

    User
      .findByIdAndUpdate(id, { handle, name, email }, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  });
