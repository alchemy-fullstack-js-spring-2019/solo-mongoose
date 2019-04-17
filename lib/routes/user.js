const { Router } = require('express');
const User = require('../models/User');

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
      .select({
        __v: false
      })
      .lean()
      .then(foundList => res.send(foundList))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()      
      .then(found => {
        res.send(found);
      })
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const {
      handle,
      name,
      email
    } = req.body;

    const updateObj = {};
    if(handle){ updateObj.handle = handle; }
    if(name){ updateObj.name = name; }
    if(email){ updateObj.email = email; }

    return User
      .findByIdAndUpdate(req.params.id, updateObj, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(result => res.send(result))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    return User
      .findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(res.send({ deleted: 1 }))
      .catch(next);
  });


