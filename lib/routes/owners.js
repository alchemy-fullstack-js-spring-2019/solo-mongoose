const { Router } = require('express');
const Owner = require('../models/Owner');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      email
    } = req.body;
    
    Owner
      .create({ name, email })
      .then(createdUser => res.send(createdUser))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Owner
      .find()
      .select({ 
        __v: false
      })
      .lean()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Owner
      .findById(id)
      .select({
        __v: false
      })
      .lean()
      .then(owner => res.send(owner))
      .catch(err => next(err));
  });
