const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router ()
  .post('/', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;

    Tweet
      .create({ handle, body })
      .then(createdTweet => {
        res.send(createdTweet);
      })
      .catch(next);
  })

  .get('/', (req, res, next)=> {
    Tweet
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next)=> {
    const { id } = req.params;

    Tweet
      .findById(id)
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .put('/:id', (req, res, next)=> {
    const { id } = req.params;
    const { 
      handle,
      body
    } = req.body;

    Tweet
      .findByIdAndUpdate(id, { handle, body }, { new: true })
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next)=> {
    const { id } = req.params;

    Tweet
      .findByIdAndDelete(id)
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });
