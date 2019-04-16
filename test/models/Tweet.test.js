const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');
const request = require('supertest');
const app = require('../../lib/app');

describe('Tweet Schema', () => {
    it('has a handle and body field', () => {
        const tweet = new Tweet({
            handle: 'Colin',
            body: 'Testing mongoose schema',
            tag: 'cat'
        });

        expect(tweet.toJSON()).toEqual({
            handle: 'Colin',
            body: 'Testing mongoose schema',
            tag: 'cat',
            _id: expect.any(mongoose.Types.ObjectId)
        })
    });

    it('has a handle which is required', () => {
        const tweet = new Tweet({
            body: 'Handle ought to be here'
        });

        // console.log(tweet);
        const error = tweet.validateSync().errors;

        expect(error.handle.message).toEqual('Path `handle` is required.')
    });
    it('registers the correct fields', () => {
        const tweet = new Tweet({
            handle: 'Frank',
            body: 'test tweet'
        });
        // console.log(typeof tweet);
        expect(tweet.toJSON()).toEqual({
            handle: 'Frank',
            body: 'test tweet',
            _id: expect.any(mongoose.Types.ObjectId)
        });
    });
});
