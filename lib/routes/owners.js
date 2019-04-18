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
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;

    Owner
      .findByIdAndUpdate(id, { name, email }, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(updatedOwner => res.send(updatedOwner))
      .catch(err => next(err));
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;

    Owner
      .findByIdAndDelete(id)
      .select({
        _id: true
      })
      .lean()
      .then(removed => res.send(removed))
      .catch(err => next(err));
  });
