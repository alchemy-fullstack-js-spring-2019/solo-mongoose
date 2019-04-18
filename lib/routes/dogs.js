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
      .select({ 
        __v: false,
        _id: false
      })
      .lean()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Dog
      .findById(id)
      .select({ 
        __v: false,
        _id: false
      })
      .lean()
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
    
    Dog
      .findByIdAndUpdate(id, { name, age }, { new: true })
      .select({ 
        __v: false,
        _id: false
      })
      .lean()
      .then(updatedDog => {
        res.send(updatedDog);
      })
      .catch(err => next(err));
  })

  .patch('/:id', (req, res, next) => {
    Dog
      .findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
      .populate('owner', {
        __v: false,
        email: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(dog => {
        res.send(dog);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;

    Dog
      .findByIdAndRemove(id)
      .select({ 
        __v: false
      })
      .lean()
      .then(removed => {
        res.send(removed);
      })
      .catch(err => next(err));
  });
