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
      .then(listOfTweets => res.send(listOfTweets));
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .then(foundTweet => res.send(foundTweet));
  });
