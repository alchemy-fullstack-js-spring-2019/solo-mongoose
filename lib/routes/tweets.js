const { Router } = require('express');
const Tweet = require('../models/Tweet');
const randomQuote = require('../services/futuramaApi');

module.exports = Router()
  .post('/', randomQuote, (req, res, next) => {
    if(req.query.random){
      return randomQuote()
        .then(quote => {
          return Tweet.create({
            user: req.body.user,
            text: quote,
            tag: req.body.tag
          })
            .then(tweet => res.send(tweet))
            .catch(next);
        });
    } else {
      Tweet.create({
        user: req.body.user,
        text: req.body.text,
        tag: req.body.tag
      })
        .then(tweet => res.send(tweet))
        .catch(next);
    }
  })
  .get('/', (req, res, next) => {
    Tweet.find()
      .populate('user', 'handle')
      .lean()
      .select({ __v: false })
      .then(list => res.send(list))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tweet.findById(req.params.id)
      .populate('user', 'handle')
      .select({ __v: false })
      .lean()
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


