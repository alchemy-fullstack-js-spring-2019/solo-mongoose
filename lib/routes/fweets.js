const Fweet = require('../models/Fweet');
const { Router } = require('express');
const futuramaQuote = require('../middleware/futurama-quote');

module.exports = Router()
  .post('/', futuramaQuote, (req, res, next) => {
    const {
      user,
      body
    } = req.body;
    Fweet
      .create({ user, body })
      .then(createdFweet => res.send(createdFweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Fweet 
      .find()
      .populate('user', {
        handle: true
      })
      .select({
        body: true
      })
      .lean()
      .then(fweets => res.send(fweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Fweet
      .findById(id)
      .populate('user', {
        handle: true
      })
      .select({
        body: true,
        user: true
      })
      .lean()
      .then(foundFweet => res.send(foundFweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Fweet
      .findByIdAndDelete(id)
      .populate('user', {
        handle: true
      })
      .select({
        body: true,
        user: true
      })
      .lean()
      .then(deletedFweet => res.send(deletedFweet))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    Fweet
      .findByIdAndUpdate(id, req.body, { new: true })
      .populate('user', {
        handle: true
      })
      .select({
        body: true,
        user: true
      })
      .lean()
      .then(updatedFweet => res.send(updatedFweet))
      .catch(next);
  });
