const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    Tweet.create({
      handle: req.body.handle,
      text: req.body.text,
      tag: req.body.tag
    })
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tweet.find()
      .populate('handle', { handle: true, text: true })
      .then(list => res.send(list))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tweet.findById(req.params.id)
      .then(found => res.send(found))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Tweet.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
      .then(updated => res.send(updated))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Tweet.findByIdAndDelete(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });


