const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
require('dotenv').config();


describe('tweet routes', () => {
    beforeAll(() => {
        return mongoose.connect(`${process.env.MONGODB_URI}`, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true
        });
    });
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });
    afterAll(() => {
        //may need to return as in example but not sure why
        return mongoose.connection.close();
    });
    it('can create a new tweet', () => {
        return User.create({ handle:'jimBob', image:'' })
        
            .then(createdUser=>{ 
                const id = createdUser._id;
                return request(app)
                    .post('/tweets')
                    .send({ user:id, body:'first message' });            
            })        
            .then ((res)=>{
                expect(res.body).toEqual({ _id:expect.any(String), __v:0, body:'first message', user:expect.any(String) });
            });
         
    });
    it('can find all tweets', () => {
        return User.create({ handle:  'Bob', image:'' })
            .then(createdUser=>{
                const id = createdUser._id;
                return request(app)
                    .post('/tweets')
                    .send({ user:id,  body:'im justa tweet' });
            })
            .then(()=>{
                return request(app)
                    .get('/tweets')//we can use lean here1!!!(not sure how)
                    .then(allTweets=>{
                        expect(allTweets.body).toHaveLength(1);
                    });
            });
    });
    it('can find a tweet by id', () => {
        return  User
            .create({ handle:'jimBob', image:'placeholder' })
            .then(createdUser=>{
                const id = createdUser._id;
                return request(app)
                    .post('/tweets')
                    .send({ user:id, body:'find me now!' });
            })
            .then(createdTweet=>{

                const id = createdTweet.body._id;
                return request(app)
                    .get(`/tweets/${id}`)
                    .then(foundTweet=>{         
                        expect(foundTweet.body).toEqual(
                            { 
                                _id:expect.any(String),
                                user:expect.any(String),
                                body:'find me now!' 
                            });
                    });
            });
    });
    it('can update a tweet by id', () => {
        return User
            .create({ handle:'jimBob', image:'placeholder' })
            .then(createdUser=>{
                const id = createdUser._id;
                return request(app)
                    .post('/tweets')
                    .send({ user:id, body:'tweet to update' });     
            })
            .then(createdTweet=>{
                const id = createdTweet.body._id;
                return request(app)
                    .patch(`/tweets/${id}`)
                    .send({ body:'updated tweet' })
                    .then(newTweet=>{
                        expect(newTweet.body).toEqual({
                            body:'updated tweet',
                            user:{
                                _id:expect.any(String),
                                handle:'jimBob'
                            }
                        });
                    });
            });  
    });
});
