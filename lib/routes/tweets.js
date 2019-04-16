const Tweets = require('../models/Tweets');
const { Router } = require('express');


module.exports = Router()
    .post('/', (req, res, next) =>{
        const {
            handle,
            body
        } = req.body;

        Tweets
            .create({ handle, body })
            .then(createdTweet => res.send(createdTweet))
            .catch(next);
    });
  
