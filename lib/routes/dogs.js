const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      owner,
      name,
      age,
      breed
    } = req.body;

    Dog
      .create({ owner, name, age, breed })
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
      .then(dogs => res.send(dogs))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    // const { id } = req.params;
    Dog
      .findById(req.params.id)
      .populate('owner', {
        __v: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(dog => res.send(dog))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { body } = req.body;
    Dog
      .findByIdAndUpdate(req.params.id, { body }, { new: true })
      .populate('owner', {
        __v: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(updatedDog => res.send(updatedDog))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Dog
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(deletedDog => res.send(deletedDog))
      .catch(next);
  });
