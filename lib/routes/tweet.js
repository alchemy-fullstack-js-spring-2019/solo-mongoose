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
    .patch('/:id', (req, res, next) => {
        const { id } = req.params;
        const {
            handle,
            body,
            tag
        } = req.body

        Tweet
            .findByIdAndUpdate(id, { handle, body, tag }, { new: true })
            .then(updatedTweet => {
                res.send(updatedTweet);
            })
            .catch(next)
    })
    .delete('/:id', (req, res, next) => {
        const { id } = req.params;

        Tweet
            .findByIdAndDelete(id)
            .then(deletedTweet => {
                console.log(deletedTweet);
                res.send(deletedTweet);
            })
            .catch(next)
    });
