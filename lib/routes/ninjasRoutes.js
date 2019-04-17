const { Router } = require('express');
const Ninja = require('../models/Ninja');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      nickname,
      age,
      tagline
    } = req.body;

    Ninja
      .create({ nickname, age, tagline })
      .then(newNinja => res.send(newNinja))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Ninja
      .find()
      .then(ninjas => res.send(ninjas))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Ninja
      .findById(id)
      .then(ninja => res.send(ninja))
      .catch(err => next(err));
  })
  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      nickname,
      age,
      tagline
    } = req.body;
    Ninja
      .findByIdAndUpdate(id, { nickname, age, tagline }, { new: true })
      .then(newNinja => res.send(newNinja))
      .catch(err => next(err));
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Ninja
      .findByIdAndDelete(id)
      .then(deletedNinja => res.send(deletedNinja))
      .catch(err => next(err));
  });
