const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app.js');
const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost:27017/tweets', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    });
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });
    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates a tweet', () => {
        return request(app)
            .post('/tweet')
            .send({ handle: 'Anna', body: 'this is my tweet' })
            .then(res => {
                expect(res.body).toEqual({ handle: 'Anna', body: 'this is my tweet', _id: expect.any(String), __v: 0 });
            });
    });

    it('gets a list of all tweets', () => {
        return Tweet.create({ 
            handle: 'allTweets', 
            body: 'gotta list em all' 
        })
            .then(() => {
                return request(app)
                    .get('/tweet');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });
});
