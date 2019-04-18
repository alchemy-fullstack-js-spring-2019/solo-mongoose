const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;

    Tweet
      .create({ handle, body })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .select({
        __v: false
      })
      .then(listOfTweets => res.send(listOfTweets));
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .select({
        __v: false
      })
      .then(foundTweet => res.send(foundTweet))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { body } = req.body;
    console.log('ID', id);
    Tweet
      .findById(id)
      .then(foundTweet => {
        console.log('FOUND TWEET', foundTweet);
        const modifiedTweet = {
          handle: foundTweet.handle,
          body,
          _id: id,
          __v: foundTweet.__v
        };
        return Tweet
          .findByIdAndUpdate(id, modifiedTweet, { new: true })
          .select({
            __v: false
          })
          .then(updatedTweet => res.send(updatedTweet))
          .catch(next);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    console.log('ID:', id);
    Tweet
      .findByIdAndDelete(id)
      .select({
        _id: true
      })
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });
