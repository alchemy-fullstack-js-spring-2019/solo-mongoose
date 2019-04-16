const { Router } = require('express');
const Pirate = require('../models/Pirate');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      ship,
      pet
    } = req.body;
    Pirate
      .create({ name, ship, pet })
      .then(createdPirate => res.send(createdPirate))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Pirate
      .find()
      .then(found => res.send(found))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Pirate
      .findById(id)
      .then(foundPirate => res.send(foundPirate))
      .catch(next);
  })