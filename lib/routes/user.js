const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, name, email } = req.body;
    
    User
      .create({ handle, name, email })
      .then(createdUser => res.send(createdUser))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    User
      .find()
      .then(results => res.send(results))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    User
      .findById(id)
      .then(results => res.send(results))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    return User
      .findById(id)
      .then(user => {
        Object.keys(req.body).map(key => {
          user[key] = req.body[key];
        });
        return user;
      })
      .then(updatedUser => {
        User
          .findByIdAndUpdate(id, updatedUser, { new: true })
          .then(results => res.send(results))
          .catch(next);
      });
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    User
      .findByIdAndDelete(id)
      .then(results => res.send(results))
      .catch(next);
  })

;
