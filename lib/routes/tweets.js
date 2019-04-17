const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      user,
      body
    } = req.body;

    Tweet
      .create({ user, body })
      .select({
        __v: false
      })
      .lean()
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(tweet => res.send(tweet))
      .catch(next); 
  })

  .patch('/:id', (req, res, next) => {
    const { body } = req.body;
    Tweet
      .findByIdAndUpdate(req.params.id, { body }, { new: true })
      .select({
        __v: false
      })
      .lean()
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findByIdAndDelete(id)
      .select({
        __v: false
      })
      .lean()
      .then(response => res.send(response))
      .catch(next);
  });

