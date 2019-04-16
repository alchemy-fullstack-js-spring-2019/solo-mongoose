const Tweets = require('../models/Tweets');
const { Router } = require('express');


module.exports = Router()
.post('/', (req, res, next) =>{
  const {
    handle,
    body
  } = req.body;

  Tweet
    .create({ handle, body})
    .then(createdTweet => res.send(createdTweet))
    .catch(next);
});
