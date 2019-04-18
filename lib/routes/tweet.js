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
  });
