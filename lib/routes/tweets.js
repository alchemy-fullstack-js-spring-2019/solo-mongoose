const { Router } = require('express');
const Tweet = require('../models/Tweet');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, body, tags } = req.body;
    Tweet
      .create({ handle, body, tags })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })
  .post('/users/:id', (req, res, next) => {
    const { body, tags } = req.body;
    User
      .findById(req.params.id)
      .lean()
      .then(foundUser => Tweet.create({ 
        handle: foundUser._id,
        body,
        tags 
      }))
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tweet
      .find()
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
      .select({
        __v: false
      })
      .lean()
      .then(foundTweet => res.send(foundTweet))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Tweet
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
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
