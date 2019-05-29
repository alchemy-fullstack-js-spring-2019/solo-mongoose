const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, user, body } = req.body;

    Tweet 
      .create({ handle, user, body })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .select({
        email: false, 
        name: false,
        __v: false
      })
      .populate('user', {
        handle: true,
        _id: true
      })
      .lean()
      .then(tweets => res.send(tweets))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .populate('user', {
        __v: false
      })
      .select({
        __v: false,
      })
      .lean()
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;
    Tweet
      .findByIdAndUpdate(req.params.id, { body, handle }, { new: true })
      .populate('user', {
        __v: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .populate('user', {
        __v: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(deletedTweet => res.send(deletedTweet._id))
      .catch(next);
  });

