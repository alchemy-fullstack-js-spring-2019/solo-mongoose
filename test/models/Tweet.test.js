const Tweets = require('../../lib/models/Tweets');
const mongoose = require('mongoose');


describe('tweet model', ()=>{
    it('makes sure handle is a string', ()=>{
        //using Tweets.create will use mongo db to create tweet.  new
        //creates it locally.  
        const tweet = new Tweets({
            handle: 'olli',
            body: 'my first tweet'
        });
        expect(tweet.toJSON()).toEqual({
            handle: 'olli',
            body: 'my first tweet',
            _id: expect.any(mongoose.Types.ObjectId)
        });
    });
    it('makes sure handle is required', ()=>{
        const tweet = new Tweets({
            body: 'testing'
        });

        const errors = tweet.validateSync().errors;

        expect(errors.handle.message).toEqual('Path `handle` is required.');
    });
    it('makes sure max length of body is 256 char', ()=>{
        const tweet = new Tweets({
            body: 't'.repeat(300)
        });
        const errors = tweet.validateSync().errors;

        expect(errors.handle.message).toEqual('Path `handle` is required.');
    });
    



});


