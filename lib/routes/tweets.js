const Tweet = require('../models/Tweet');
// const User = require('../models/User');
const { Router } = require('express');
const getQuote = require('../middleware/futurama');

module.exports = Router()
  .post('/', getQuote, (req, res, next) => {
    const {
      user,
      body
    } = req.body;

    if(req.query.random === 'true'){
      Tweet
        .create({ user, body: req.quote })
        .then(createdTweet => res.send(createdTweet))
        .catch(next);
    } else {
      Tweet
        .create({ user, body })
        .then(createdTweet => res.send(createdTweet))
        .catch(next);
    } 
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .select({
        __v: false,
      })
      .lean()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .populate('user', {
        handle: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      body
    } = req.body;
    Tweet
      .findByIdAndUpdate(id, { body }, { new: true })
      .populate('user', {
        handle: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;  
    Tweet
      .findByIdAndDelete(id)
      .populate('user', {
        handle: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });

