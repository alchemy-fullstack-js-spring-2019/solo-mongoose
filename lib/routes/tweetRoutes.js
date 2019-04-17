const { Router } = require('express');
const TweetSchema = require('../models/tweetSchema.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;
    //destructuring the request's body to grab their handle and body to then pass it to tweetSchema and make a tweet from it in the mongo DB, with each parameter checked by the schema skeleton

    TweetSchema
      .create({
        handle,
        body
      })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    TweetSchema //which is our mongo database right??
      .find()
      .then(tweetsList => res.send(tweetsList))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    TweetSchema
      .findById(id)
      .then(foundTweet => res.send(foundTweet))
      .catch(next);
  })
  //why /:id
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      handle,
      body
    } = req.body;
    TweetSchema
      .findByIdAndUpdate(id, { handle, body })
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  });





  
