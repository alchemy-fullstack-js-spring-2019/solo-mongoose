const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      text
    } = req.body;

    Tweet
      .create({ handle, text })
      .then(created => res.send(created))
      .catch(next);
  });
