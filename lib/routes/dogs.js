const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      handle,
      email
    } = req.body;

    Dog 
      .create({ name, handle, email })
      .then(createdDog => res.send(createdDog))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Dog 
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(foundDogs => res.send(foundDogs))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Dog
      .findById(id)
      .select({
        __v: false
      })
      .lean()
      .then(foundDog => res.send(foundDog))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;

    Dog 
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(olderDog => res.send(olderDog))
      .catch(next); 
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;

    Dog
      .findByIdAndDelete(id)
      .select({
        __v: false
      })
      .lean()
      .then(result => res.send(result))
      .catch(next);
  });
