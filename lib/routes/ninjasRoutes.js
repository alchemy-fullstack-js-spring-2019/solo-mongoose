const { Router } = require('express');
const Ninja = require('../models/Ninja');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      user,
      age,
      tagline
    } = req.body;

    Ninja
      .create({ user, age, tagline })
      .then(newNinja => res.send(newNinja))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Ninja
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(ninjas => res.send(ninjas))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Ninja
      .findById(id)
      .populate('user', {
        __v: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(ninja => res.send(ninja))
      .catch(err => next(err));
  })
  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      age,
      tagline
    } = req.body;
    Ninja
      .findByIdAndUpdate(id, { age, tagline }, { new: true })
      .populate('user', {
        __v: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(newNinja => res.send(newNinja))
      .catch(err => next(err));
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Ninja
      .findByIdAndDelete(id)
      .populate('user', {
        __v: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(deletedNinja => res.send(deletedNinja))
      .catch(err => next(err));
  });
