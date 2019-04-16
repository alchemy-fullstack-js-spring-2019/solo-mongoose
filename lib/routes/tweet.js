const { Router } = require('express');
const tweetSchema = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;

    tweetSchema
      .create({ handle, body })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  });
