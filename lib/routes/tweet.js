const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router() 
    .post('/', (req, res, next) => {
        const {
            user,
            body,
        } = req.body;

        Tweet
            .create({ user, body })
            .then(createdTweet => res.send(createdTweet))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Tweet
            .find()
            .lean()
            .select({
                __v: false
            })
            .then(tweets => res.send(tweets))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        
        Tweet
            .findById(req.params.id)
            .lean()
            .populate('user', {
                __v: false
            })
            .select({
                __v: false
            })
            .then(tweet => res.send(tweet))
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {
        Tweet
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .lean()
            .populate('user', {
                __v: false
            })
            .select({
                __v: false
            })
            .then(tweet => res.send(tweet))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Tweet
            .findByIdAndDelete(req.params.id)
            .lean()
            .populate('user', {
                __v: false
            })
            .select({
                __v: false
            })
            .then(deleted => res.send(deleted))
            .catch(next);
    });
    

    
