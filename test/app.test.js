const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweets');
require('dotenv').config();
console.log('work!!!!');

describe('tweet routes', ()=>{
    beforeAll(()=>{   
        mongoose.connect(`mongodb://${process.env.MONGO_HOST}/tweets`, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true
        });
    });
    beforeEach(()=>{     
        mongoose.connection.dropDatabase();
    });
    afterAll(()=>{
        //may need to return as in example but not sure why
        mongoose.connection.close();
    });
    it('can create a new tweet', ()=>{
        return request(app)
            .post('/tweets')
            .send({ handle: 'olli', body: 'my first tweet' })
            .then(res=>{
                expect(res.body).toEqual({
                    handle: 'olli',
                    body: 'my first tweet',
                    _id: expect.any(String),
                    __v:0
                });
            });
    });
    it('can find all tweets', ()=>{
        return Tweet
            .create({ handle:'only', body:'tweet I got' })
            .then(()=>{
                return request(app)
                    .get('/tweets')
                    .then(allTweets=>{
                        expect(allTweets.body.length).toBe(1);
                    });
            });
    });
    it('can find a tweet by id', ()=>{
        return Tweet
            .create({ handle:'only', body:'tweet I got' })
            .then(createdTweets=>{       
                const id = createdTweets._id;
                return request(app)              
                    .get(`/tweets/${id}`)
                    .then(foundTweet=>{
                        expect(foundTweet.body).toEqual({
                            handle:'only', 
                            body:'tweet I got',
                            __v:0,
                            _id: expect.any(String)
                        });
                    });
            });
    });
    it('can update a tweet by id', ()=>{
        return Tweet
            .create({ handle:'update', body:'meow' })
            .then(createdTweet=>{
                return request(app)
                    .put(`/tweets/${createdTweet._id}`)
                    .send({
                        handle:'updated',
                        body:'thanks!' 
                    });
            })
            .then(updatedTweet=>{
                expect (updatedTweet.body).toEqual({
                    handle:'updated',
                    body:'thanks!',
                    __v:0,
                    _id:expect.any(String)
                });
            });        
    });
    it('can delete tweet by id', ()=>{
        return Tweet
            .create({
                handle:'delete me',
                body: 'delete me now!' 
            })
            .then(createdTweet=>{
                const id = createdTweet._id;        
                return request(app)
                    .delete(`/tweets/${id}`);               
            })
            .then(()=>{
                return request(app)
                    .get('/tweets')
                    .then(foundTweets=>{    
                        expect(foundTweets.body.length).toBe(0);
                    });
            });
    });
});
