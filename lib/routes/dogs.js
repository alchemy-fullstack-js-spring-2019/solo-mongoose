const Dog = require('../models/Dog');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      age,
      color,
      favoriteFood
    } = req.body;

    Dog
      .create({ name, age, color, favoriteFood })
      .then(createdDog => res.send(createdDog))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Dog
      .find()
      .then(dogs => res.send(dogs))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Dog
      .findById(id)
      .then(dog => res.send(dog))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      color,
      age,
      favoriteFood
    } = req.body;
    Dog
      .findByIdAndUpdate(id, { name, color, age, favoriteFood }, { new: true })
      .then(updatedDog => res.send(updatedDog))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;  
    Dog
      .findByIdAndDelete(id)
      .then(deletedDog => res.send(deletedDog))
      .catch(next);
  });
