const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    Tweet.create({
      handle: req.body.handle, //needs to reference User { 'handle' true }
      text: req.body.text,
      tag: req.body.tag
    })
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tweet.find()
      .select('handle')
      .lean()
      .select({ __v: false })
      .then(list => res.send(list))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tweet.findById(req.params.id)
      .lean()
      .select({ __v: false })
      .then(found => res.send(found))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Tweet.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
      .lean()
      .select({ __v: false })
      .then(updated => res.send(updated))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Tweet.findByIdAndDelete(req.params.id)
      .lean()
      .select({ __v: false })
      .then(deleted => res.send(deleted))
      .catch(next);
  });


