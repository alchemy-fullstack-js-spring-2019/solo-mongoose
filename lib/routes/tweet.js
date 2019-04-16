const Tweet = require('../models/Tweet');
const { Router } = require('express');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            handle,
            body,
            tag
        } = req.body;

        Tweet
            .create({ handle, body, tag})
            .then(createdTweet => {
                res.send(createdTweet);
            })
            .catch(next)
    });
