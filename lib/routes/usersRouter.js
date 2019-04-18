const { Router } = require('express');
const Users = require('../models/Users');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      name, 
      email,
    } = req.body;

    Users
      .create({ handle, name, email })
      .then(createdUser => res.send(createdUser))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Users
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(createdUser => res.send(createdUser))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Users
      .findById(req.params.id)
      .select ({
        __v: false
      })
      .lean()
      .then(user => {
        res.send(user);
      })
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      handle,
      name,
      email,
      image
    } = req.body;

    return Users
      .findByIdAndUpdate(id, { handle, name, email, image }, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(users => res.send(users))
      .catch(next);
  });

  // .delete('/:id', (req, res, next) => {
  //   const { id } = req.params;
  //   Users
  //     .findByIdAndDelete(id)
  //     .select({
  //       __v: false
  //     })
  //     .lean()
  //     .then(deletedUser => res.send(deletedUser))
  //     .catch(next);
  // });
