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
      .lean()
      .select({
        __v: false
      })
      .then(toys => res.send(toys))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Toy
      .findById(id)
      .lean()
      .select({
        __v: false
      })
      .then(toy => res.send(toy))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      description,
      color,
      condition
    } = req.body;
    Toy
      .findByIdAndUpdate(id, { name, description, color, condition }, { new: true })
      .lean()
      .select({
        __v: false
      })
      .then(toy => res.send(toy))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Toy
      .findByIdAndDelete(id)
      .lean()
      .select({
        __v: false
      })
      .then(deletedToy => res.send(deletedToy))
      .catch(next);
  });
