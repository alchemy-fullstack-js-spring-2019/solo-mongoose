const { Router } = require('express');
const UserSchema = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      name,
      email
    } = req.body;

    UserSchema
      .create({ handle, name, email })
      .then(newUser => res.send(newUser))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    UserSchema
      .find()
      .then(userlist => res.send(userlist))
      .catch(err => {
        next(err);
      });
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    UserSchema
      .findById(id)
      .then(IDeduser => res.send(IDeduser))
      .catch(next);
  })
  
  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      handle,
      name
    } = req.body;

    UserSchema
      .findByIdAndUpdate(id, { handle, name }, { new: true })
      .then(updatedUser => res.send(updatedUser))
      .catch(err => {
        next(err);
      });
  });

       

