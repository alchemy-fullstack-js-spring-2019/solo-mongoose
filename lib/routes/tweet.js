const { Router } = require('express');
const Tweet = require('../models/Tweet');


module.exports = Router()
  .post('/', (req, res, next) => {
    const { user, body } = req.body;
    Tweet
      .create({ user, body })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .lean()
      .select({ __v: false })
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .lean()
      .select({ __v: false })
      .then(results => res.send(results))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .lean()
      .then(tweet => {
        Object.keys(req.body).map(key => {
          tweet[key] = req.body[key];
        });
        return tweet;
      })
      .then(updatedTweet => {
        Tweet
          .findByIdAndUpdate(id, updatedTweet, { new: true })
          .lean()
          .select({ __v: false })
          .then(result => res.send(result))
          .catch(next);
      });
  })
      
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findByIdAndDelete(id)
      .lean()
      .select({ __v: false })
      .then(results => res.send(results))
      .catch(next);
  })
;
