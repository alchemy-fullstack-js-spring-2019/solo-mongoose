const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      user, //handle, 
      body
    } = req.body;

    Tweet
      .create({ user, body }) //handle
      // .populate('user', () => {
      //   _v: false
      // });
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })
  // findById
  .get('/', (req, res, next) => {
    Tweet
      //.create({ handle: 'CRUD', body: 'Create! Read! Update! Delete!' })
      .then(tweet => {
        return Tweet.findById(tweet._id);
      })
      .then(foundTweet => res.send(foundTweet))
      .catch(next);
  })

// findByIdAndUpdate
  .get('/', (req, res, next) => {
    Tweet
      //.create()
      .then(createdTweet => {
        return Tweet.findByIdAndUpdate(createdTweet.params._id, createdTweet.params.body);
      })
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  });
  

  

  
