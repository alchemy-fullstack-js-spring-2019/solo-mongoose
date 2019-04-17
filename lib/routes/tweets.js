const Tweet = require('../models/Tweet');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;

    Tweet
      .create({ handle, body })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      // .populate('User')
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      // .populate('User')
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      body
    } = req.body;
    Tweet
      .findByIdAndUpdate(id, { body }, { new: true })
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;  
    Tweet
      .findByIdAndDelete(id)
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });

