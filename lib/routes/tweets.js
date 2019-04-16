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
  });
