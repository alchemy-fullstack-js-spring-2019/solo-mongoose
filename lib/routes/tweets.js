const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;

    Tweet 
      .create({ handle, body })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tweet 
      .find()
      .then(foundTweets => res.send(foundTweets))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet 
      .findById(id)
      .then(foundTweet => res.send(foundTweet))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;

    Tweet 
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
      .then(tweet => res.send(tweet))
      .catch(next); 
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Tweet
      .findByIdAndDelete(id)
      .then(result => res.send(result));
  })

