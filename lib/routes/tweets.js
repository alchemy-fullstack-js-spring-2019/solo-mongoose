const { Router } = require('express');
const Tweet = require('../models/Tweet');
const User = require('../models/User');
const insertQuote = require('../middleware/insertQuote');

module.exports = Router()
  .post('/users/:id', insertQuote, (req, res, next) => {
    const { body, tags } = req.body;
    User
      .findById(req.params.id)
      .lean()
      .then(foundUser => Tweet.create({ 
        user: foundUser._id,
        body,
        tags 
      }))
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .populate('user', {
        handle: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(foundTweets => res.send(foundTweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .populate('user', {
        handle: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(foundTweet => res.send(foundTweet))
      .catch(next);
  })

  .get('/users/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .then(foundUser => Tweet
        .find({ user: foundUser._id })
        .populate('user', {
          handle: true
        })
        .select({
          __v: false
        })
        .lean()
      )
      .then(foundTweets => res.send(foundTweets))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { body, tags } = req.body;
    Tweet
      .findByIdAndUpdate(req.params.id, { body, tags }, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });
