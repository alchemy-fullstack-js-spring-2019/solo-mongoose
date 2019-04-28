const { Router } = require('express');
const Tweet = require('../models/Tweet');
const futurama = require('../middleware/futuramaQuote');

module.exports = Router() 

  // create
  .post('/', futurama, (req, res, next) => {
    const {
      user,
      body
    } = req.body;
    Tweet
      .create({ user, body })
      .then(createdTweet => {
        res.send(createdTweet);
      })
      .catch(next);
  })

  // get all
  .get('/all', (req, res, next) => {
    Tweet
      .find()
      .lean()
      .select({
        __v: false,
        _id: false
      })
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  // findById
  .get('/:id', (req, res, next) => {
        
    Tweet
      .findById(req.params.id)

      .populate('user', {
        __v: false
      })
      .lean()
      .select({
        __v: false,
        _id: false
      })
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  // find by id and update
  .patch('/:id', (req, res, next) => {
    Tweet
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .lean()
      .populate('user', {
        __v: false
      })
      .select({
        __v: false,
        _id: false
      })
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Tweet
      .findOneAndDelete(req.params.id)
      .lean()
      .populate('user', {
        __v: false
      })
      .select({
        __v: false,
        _id: false
      })
      .then(deleted => res.send(deleted))
      .catch(next);
  });
