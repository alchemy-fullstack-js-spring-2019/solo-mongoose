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
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .lean()
      .select({
        __v: false
      })
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet 
      .findById(id)
      .populate('user', {

      })
      .lean()
      .select({
        __v: false
      })
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      user,
      body
    } = req.body;

    Tweet
      .findByIdAndUpdate(id, { user, body }, { new: true })
      .lean()
      .select({ 
        __v: false
      })
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findByIdAndDelete(id)
      .lean()
      .select({
        __v: false
      })
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });
