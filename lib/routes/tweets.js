const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      user,
      body
    } = req.body;
    Tweet
      .create({ user, body })
      .populate('user', () => {
      })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })
  // get all
  .get('/all', (req, res, next) => {
    Tweet
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })
  // findById
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
    
      .populate('user', {
        _id: true,
        name: true
      })
      .lean()
      .select({
        _v: false
      })

      .then(tweet => res.send(tweet))
      .catch(next);





  //   Tweet;
  //   return Tweet.findById(Tweet._id)//req.params._id)
  //     .then(foundTweet => res.send(foundTweet))
  //     // .then(twId => {
  //     //   res.send(twId);
  //     // })
  //     .catch(next);
  });  
