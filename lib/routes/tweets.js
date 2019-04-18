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
            .populate('User', { _v:false })//select for populate
            .select({ __v: false })//you can add lean after select
            .then(tweet=>{
            
                res.send(tweet);
            })
            .catch(next);
    })
    .patch('/:id', (req, res, next) =>{
        const { id } = req.params;
        const { body } = req.body;
   
        Tweets  
            .findByIdAndUpdate(id, {  body }, { new : true })
            .populate('user', { __v:false, image:false }) //why do we not want images (dont want to show image in tweet)????
            .select({ __v:false, _id:false })
            .lean()//can apply lean after select
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

