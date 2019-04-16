const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    Tweet.create({
      handle: req.body.handle,
      text: req.body.text,
      tag: req.body.tag
    })
      .then(tweet => res.send(tweet))
      .catch(next);
  });

