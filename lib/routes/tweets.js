const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      user,
      body
    } = req.body;

    Tweet 
      .create({ user, body })
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
    const { id } = req.params;
    Tweet 
      .findById(id)
      .select({
        __v: false
      })
      .lean()
      .then(foundTweet => res.send(foundTweet))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;

    Tweet 
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(tweet => res.send(tweet))
      .catch(next); 
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;

    Tweet
      .findByIdAndDelete(id)
      .select({
        __v: false
      })
      .lean()
      .then(result => res.send(result))
      .catch(next);
  });

