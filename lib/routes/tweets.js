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
           
            .then(createdTweet => { 
                return res.send(createdTweet);
            })
            .catch(next);
    })
    .get('/', (req, res, next) =>{
        return Tweets
            .find()
            .select({
                __v:false
            })
            .lean()
            .then(found=>{
                const stuff = found.map(item=>{
                    return {
                        ...item
                    };
                });
                
                console.log('found in tweets.js', stuff);
                return res.send(found);
            })
            .catch(next);
    })
    .get('/:id', (req, res, next) =>{
       
        const { id } = req.params;
    
        return  Tweets
            .findById(id)
            .then(foundTweet => res.send(foundTweet))
            .catch(next);
    })
    .put('/:id', (req, res, next) =>{
        const { id } = req.params;
        const {
            handle,
            body
        } = req.body;
        Tweets  
            .findByIdAndUpdate(id, { handle, body }, { new : true })
            .then(updatedTweet=>res.send(updatedTweet))
            .catch(next);
    })
    .delete('/:id', (req, res, next) =>{
        const { id } = req.params;
        return  Tweets
            .findByIdAndDelete(id)
            .then(res.send)
            .catch(next);
    });

