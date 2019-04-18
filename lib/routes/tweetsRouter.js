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
      .populate({
        handle: true
      })
      .select({
        __v: false,
        body: true
      })
      .lean()
      .then(tweets => res.send(tweets))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .populate('user', {
        name: true,
        _id: true,
        body: true
      })
      .select({
        __v: false,
        body: true
      })
      .lean()
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      body
    } = req.body;
    Tweet
      .findByIdAndUpdate(id, { body }, { new: true })
      .populate('user', {
        handle: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findByIdAndDelete(id)
      .populate('user', {
        handle: true
      })
      .select({
        _id: true,
        __v: false
      })
      .lean()
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });

