const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      image
    } = req.body;

    User
      .create({ handle, image })
      .then(user => res.send(user))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    User
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(listOfUsers => res.send(listOfUsers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(user => res.send(user))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    console.log('REQBODY:',req.body);
    const updatedObj = {};
    if(req.body.handle) updatedObj.handle = req.body.handle;
    if(req.body.image) updatedObj.image = req.body.image;

    User
      .findByIdAndUpdate(req.params.id, updatedObj, { new: true })
      .lean()
      .then(updatedUser => {
        console.log('UPDATED USER: ', updatedUser);
        res.send(updatedUser);
      })
      .catch(next);
  });
