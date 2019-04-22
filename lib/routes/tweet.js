const { Router } = require('express');
const tweetSchema = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;

    tweetSchema
      .create({ handle, body })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    tweetSchema
      .find()
      .lean()
      .then(tweetlist => res.send(tweetlist))
      .catch(err => {
        next(err);
      });
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    tweetSchema
      .findById(id)
      .lean()
      .select({ _v: false })
      .then(IDedtweet => res.send(IDedtweet))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      handle,
      body
    } = req.body;

    tweetSchema
      .findByIdAndUpdate(id, { handle, body }, { new: true })
      .lean()
      .then(updatedTweet => res.send(updatedTweet))
      .catch(err => {
        next(err);
      });
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;

    tweetSchema
      .findByIdAndDelete(id)
      .lean()
      .then(result => res.send(result))
      .catch(err => {
        next(err);
      });
  });
  

