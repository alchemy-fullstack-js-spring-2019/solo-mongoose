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
    Tweet
      .findById(id)
      .then(tweet => {
        Object.keys(req.body).map(key => {
          tweet[key] = req.body[key];
        });
        return tweet;
      })
      .then(updatedTweet => {
        Tweet
          .findByIdAndUpdate(id, updatedTweet, { new: true })
          .then(result => res.send(result))
          .catch(next);
      });
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findByIdAndDelete(id)
      .then(results => res.send(results))
      .catch(next);
  })
;
