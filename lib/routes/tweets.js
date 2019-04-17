const { Router } = require('express');
const Tweet = require('../models/Tweet');
const futuramaQuote = require('../services/futurama-api');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      user,
      body
    } = req.body;
    
    const { random } = req.params;

    if(random) {
      futuramaQuote()
        .then(quote => {
          req.body.body = quote;
          return Tweet.create({ user, body });
        });
    } else {
      Tweet 
        .create({ user, body })
        .then(createdTweet => res.send(createdTweet))
        .catch(next);
    }
  })
  .get('/', (req, res, next) => {
    Tweet 
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(foundTweets => res.send(foundTweets))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet 
      .findById(id)
      .populate('user', {
        __v: false
      })
      .select({
        __v: false
      })
      .lean()
      .then(foundTweet => res.send(foundTweet))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;

    Tweet 
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
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
    const { id } = req.params;

    Tweet
      .findByIdAndDelete(id)
      .select({
        _id: true
      })
      .lean()
      .then(result => res.send(result))
      .catch(next);
  });

