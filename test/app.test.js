const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost:27017/tweets', {
            useFindAndModify: false,
            useNewUrlParse: true,
            useCreateIndex: true
        });
    });
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });
    afterAll(() => {
        return mongoose.connection.close();
    })

    it('creates a new tweet', () => {
        return request(app)
            .post('/tweets')
            .send({
                handle: 'Colin',
                body: 'test if this was created',
                tag: 'cats'
            })
            .then(createdTweet => {
                expect(createdTweet.body).toEqual({
                    handle: 'Colin',
                    body: 'test if this was created',
                    tag: 'cats',
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });
    it('returns all tweets', () => {
        return Tweet.create({ handle: 'Ryan', body: 'Get this', tag: 'cats' })
            .then(() => {
                return request(app)
                    .get('/tweets')
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    })
    it('returns a tweet by id', () => {
        return Tweet.create({ handle: 'Frank', body: 'Get this by ID', tag: 'findById'})
            .then(createdTweet => {
                return request(app)
                    .get(`/tweets/${createdTweet._id}`)
            })
            .then(returnedTweet => {
                expect(returnedTweet.body).toEqual({
                    handle: 'Frank',
                    body: 'Get this by ID',
                    tag: 'findById',
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });
    it('returns an updated tweet', () => {
        return Tweet.create({ handle: 'Frank', body: 'Get this by ID', tag: 'findById'})
            .then(createdTweet => {
                return request(app)
                    .patch(`/tweets/${createdTweet.id}`)
                    .send({
                        handle: 'Gary',
                        body: 'Get this by ID',
                        tag: 'findByIdAndUpdate'
                    })
            })
            .then(updatedTweet => {
                expect(updatedTweet.body).toEqual({
                    handle: 'Gary',
                    body: 'Get this by ID',
                    tag: 'findByIdAndUpdate',
                    _id: expect.any(String),
                    __v: 0
                });
            });
    })
});
