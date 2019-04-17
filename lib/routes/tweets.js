const { Router } = require('express');
const Tweet = require('../models/Tweet');


module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, body } = req.body;

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
      .then(results => res.send(results))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    return Tweet
      .findById(id)
      .then(tweet => {
        tweet.body = req.body.body;
        return tweet;
      })
      .then(updatedTweet => {
        return Tweet
          .findByIdAndUpdate(id, updatedTweet)
          .then(result => res.send(result))
          .catch(next);
      });

  })
  
;
