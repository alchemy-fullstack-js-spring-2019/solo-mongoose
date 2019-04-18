const Tweets = require('../models/Tweets');
const { Router } = require('express');


module.exports = Router()
    .post('/', (req, res, next) =>{
        const {
            //user = user id created by user route
            user,
            body
        } = req.body;
        Tweets
            .create({ user, body })      
            .then(createdTweet => { 
                res.send(createdTweet);
            })
            .catch(next);
    })
    .get('/', (req, res, next) =>{
        Tweets
            .find()
            .select({
                __v:false
            })
            .lean()
            .then(tweets=>{
                //this shows why lean is usefull
                // const stuff = tweets.map(item=>{
                //     return {
                //         ...item
                //     };
                // });   
                // console.log('found in tweets.js', stuff);
                return res.send(tweets);
            })
            .catch(next);
    })
    .get('/:id', (req, res, next) =>{
        const { id } = req.params;
        return  Tweets
            .findById(id)
            .populate('user', { _v:false })//select for populate
            .select({ __v: false })
            .catch(next);
    })
    .patch('/:id', (req, res, next) =>{
        const { id } = req.params;
        const { body } = req.body;
        Tweets  
            .findByIdAndUpdate(id, {  body }, { new : true })
            .populate('user', { _v:false, image:false }) //why do we not want images (dont want to show image in tweet)????
            .select({ _v:false })
            .then(updatedTweet=>res.send(updatedTweet))
            .catch(next);
    })
    .delete('/:id', (req, res, next) =>{
        const { id } = req.params;
        Tweets
            .findByIdAndDelete(id)
            .select({ id:true })//only sends back the id of the deleted tweet.  user is not deleted since they may have other tweets :)(:(:((:()))))
            .then(res.send)
            .catch(next);
    });

