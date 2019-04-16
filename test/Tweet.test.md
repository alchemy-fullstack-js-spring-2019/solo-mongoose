const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');

describe('Tweet model', () => {
    it('has a handle and body field', () => {
        const tweet = new Tweet({
            handle: 'ryan',
            body: 'my first tweet'
        });

        expect(tweet.toJSON()).toEqual({
            handle: 'ryan',
            body:'my first tweet',
            _id: expect.any(Object)
        });
    });

    it('has a required handle field', () => {
        const tweet = new Tweet({
            body: 'my first tweet'
        });

        const errors = tweet.validateSync().errors;

        expect(errors.handle.message).toEqual('Path handle is...');
    });

    it('hase a required body field', () => {
        const tweet = new Tweet({
            handle: 'ryan'
        });

        const errors = tweet.validateSync().errors;

        expect(errors.body.message).toEqual('Path body...');
    });

    it('has a body with maxLength 256', () => {
        const tweet = new Tweet({
            handle: 'ryan',
            body: 'a'.repeat(3000)
        });

        const errors = tweet.validateSync().errors;

        expect(errors.body.message).toEqual(`Path \ body\ (\`${body}\`) is loner than the maximum allowed legnth (256)`);
    });
});
