const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

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

    it.only('creates a new tweet', () => {
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
            })
    })
})
