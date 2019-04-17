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
        const keyToUpdate = Object.keys(req.body)[0];
        user[keyToUpdate] = req.body[keyToUpdate];
        return user;
      })
      .then(updatedUser => {
        User
          .findByIdAndUpdate(id, updatedUser, { new: true })
          .then(results => res.send(results))
          .catch(next);
      });
  })

;
