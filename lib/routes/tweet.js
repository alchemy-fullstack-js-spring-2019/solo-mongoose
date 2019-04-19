const Tweet = require('../models/Tweet');
const { Router } = require('express');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            user,
            body,
            tag,
            quote
        } = req.body;
        if(req.query.random) {
            Tweet
                .create({ user, body: req.body})
                .then(createdTweet => {
                    res.send(createdTweet)
                    .next()
                })
                .catch(next)
        }
        else {
            Tweet
                .create({ user, body })
                .then(createdTweet => {
                    res.send(createdTweet)
                    .next()
                })
                .catch(next)
        }
    })
    .get('/', (req, res, next) => {
        Tweet
            .find()
            .populate('user', {
                __v: false
            })
            .select({
                __v: false
            })
            .lean()
            .then(profiles => res.send(profiles))
            .catch(next)
    })
    .get('/:id', (req, res, next) => {
        const { id } = req.params;
        return Tweet
            .findById(id)
            .populate('user', {
                __v: false
            })
            .select({
                __v: false
            })
            .lean()
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
            .populate('user', {
                __v: false
            })
            .select({
                __v: false
            })
            .lean()
            .then(updatedTweet => {
                res.send(updatedTweet);
            })
            .catch(next)
    })
    .delete('/:id', (req, res, next) => {
        Tweet
        .findByIdAndDelete(req.params.id)
        .select({
            _id: true
        })
        .then(deletedTweet => {
            res.send(deletedTweet);
        })
        .catch(next);
    });
