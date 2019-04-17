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
    })
    .get('/', (req, res, next) => {
        Tweet
            .find()
            .then(profiles => res.send(profiles))
            .catch(next)
    })
    .get('/:id', (req, res, next) => {
        const { id } = req.params;
        return Tweet
            .findById(id)
            .then(returnedTweet => {
                res.send(returnedTweet);
            })
            .catch(next)
    })
