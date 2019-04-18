const { Router } = require('express');
const Tweet = require('../models/Tweet');
const futuramaQuote = require('../middleware/futurama-quote');

module.exports = Router()
  .post('/', futuramaQuote, (req, res, next) => {
    const {
      user,
      body
    } = req.body;
    if(req.query.random) {
      Tweet
        .create({ user, body:req.body })
        .then(createdTweet => {
          res.send(createdTweet);
        });
    }
    else {
      Tweet
        .create({ user, body })
        .then(createdTweet => {
          res.send(createdTweet);
        })
        .catch(next);
    }
  })

  .get('/', (req, res, next)=> {
    Tweet
      .find()
      .populate('user', {
        _id: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next)=> {
    const { id } = req.params;

    Tweet
      .findById(id)
      .populate('user', { 
        _id: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .patch('/:id', (req, res, next)=> {
    const { id } = req.params;
    const { body } = req.body;

    Tweet
      .findByIdAndUpdate(id, { body }, { new: true })
      .populate('user', { 
        _id: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next)=> {
    const { id } = req.params;

    Tweet
      .findByIdAndDelete(id)
      .populate('user', { 
        _id: true
      })
      .select({
        __v: false
      })
      .lean()
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });
