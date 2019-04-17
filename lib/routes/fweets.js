const Fweet = require('../models/Fweet');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;
    Fweet
      .create({ handle, body })
      .then(createdFweet => res.send(createdFweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Fweet 
      .find()
      .populate('handle', {
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
      .populate('handle', {
        handle: true
      })
      .select({
        body: true,
        handle: true
      })
      .lean()
      .then(foundFweet => res.send(foundFweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Fweet
      .findByIdAndDelete(id)
      .populate('handle', {
        handle: true
      })
      .select({
        body: true,
        handle: true
      })
      .lean()
      .then(deletedFweet => res.send(deletedFweet))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    Fweet
      .findByIdAndUpdate(id, req.body, { new: true })
      .populate('handle', {
        handle: true
      })
      .select({
        body: true,
        handle: true
      })
      .lean()
      .then(updatedFweet => res.send(updatedFweet))
      .catch(next);
  });
