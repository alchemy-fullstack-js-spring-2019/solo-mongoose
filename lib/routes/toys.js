const { Router } = require('express');
const Toy = require('../models/Toys');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      description,
      color,
      condition
    } = req.body;

    Toy
      .create({ name, description, color, condition })
      .then(createdToy => res.send(createdToy))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Toy
      .find()
      .then(toys => res.send(toys))
      .catch(next);
  })
