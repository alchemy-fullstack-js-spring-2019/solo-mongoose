const Tweet = require('../models/Tweet');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      body,
    } = req.body;

    Tweet
      .create({ handle, body })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .then(tweet => res.send(tweet))
      .catch(next);
  });
