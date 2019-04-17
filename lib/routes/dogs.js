const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      breed,
      age
    } = req.body;

    Dog 
      .create({ name, breed, age })
      .then(createdDog => res.send(createdDog))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Dog 
      .find()
      .then(foundDogs => res.send(foundDogs))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Dog
      .findById(id)
      .then(foundDog => res.send(foundDog))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;

    Dog 
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
      .then(olderDog => res.send(olderDog))
      .catch(next); 
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Dog
      .findByIdAndDelete(id)
      .then(result => res.send(result))
      .catch(next);
  });
