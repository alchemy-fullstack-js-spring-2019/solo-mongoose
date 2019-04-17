const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      age
    } = req.body;

    Dog
      .create({ name, age })
      .then(createdDog => res.send(createdDog))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Dog
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Dog
      .findById(id)
      .then(dog => {
        res.send(dog);
      })
      .catch(err => next(err));
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      age
    } = req.body;
    console.log(req.body);
    
    Dog
      .findByIdAndUpdate(id, { name, age }, { new: true })
      .then(updatedDog => {
        console.log(updatedDog);
        res.send(updatedDog);
      })
      .catch(err => next(err));
  });
