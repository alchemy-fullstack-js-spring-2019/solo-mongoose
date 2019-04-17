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
  });
