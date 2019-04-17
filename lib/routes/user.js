const { Router } = require('express');
const userSchema = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      name,
      email
    } = req.body;

    userSchema
      .create({ handle, name, email })
      .then(newUser => res.send(newUser))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    userSchema
      .find()
      .then(userlist => res.send(userlist))
      .catch(err => {
        next(err);
      });
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    userSchema
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

    userSchema
      .findByIdAndUpdate(id, { handle, name }, { new: true })
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  });

       

