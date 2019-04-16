const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, body, tags } = req.body;
    Tweet
      .create({ handle, body, tags })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  });
