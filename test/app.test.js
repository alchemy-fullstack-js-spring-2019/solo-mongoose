const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app.js');

describe('tweet routes', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost:27017/tweets', {
            useNewUrlParser: true
        });
    });
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });
    afterEach(() => {
        return mongoose.connection.close();
    });

    it('creates a tweet', () => {
        return request(app)
            .post('/tweet')
            .send({ handle: 'Anna', body: 'this is my tweet' })
            .then(res => {
                expect(res.body).toEqual({ handle: 'Anna', body: 'this is my tweet', _id: expect.any(String), __v: 0 })
            });
    });
});
