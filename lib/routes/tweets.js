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
      .populate('user', {
        handle: true,
        name: false,
        _id: false,
        __v: false
      })
      .lean()
      .select({
        __v: false
      })
      .then(createdTweet => res.send(createdTweet))
      .catch(next);
  })

// get all
  .get('/all', (req, res, next) => {
    Tweet
      .find()
      .populate('user', {
        handle: true,
        __v: true,
        name: true,
        email: true
      })
    
    //.lean()
      .select({
        __v: false,
        user: ({
          handle: true
        })
      })
    // .then(tweet => {
    //   // const user = tweet.user.select({

    //   // });
    //   // const body = tweet.body;
    //   //const tweet = (user, body).toJSON();
    //   tweet.toJSON();
    //   return tweet;
    // })

    
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  
  // findById
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
    
      .populate('user', {
        handle: true,
        _id: true,
        name: true
      })
      .lean()
      .select({
        _v: false
      })

      .then(tweet => res.send(tweet))
      .catch(next);
  })

  // find by id and update
  .patch('/:id', (req, res, next) => {
    const { 
      user, 
      body } = req.body;
    Tweet
      .findByIdAndUpdate(req.params.id, { user, body }, { new: true })
      .lean()
      .select({
        __v: false
      })
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Tweet
      .findOneAndDelete(req.params.id)
      .select({
        _id: true
      })
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });
  
