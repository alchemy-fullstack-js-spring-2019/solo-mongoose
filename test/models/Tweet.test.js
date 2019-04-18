const Tweets = require('../../lib/models/Tweets');
const mongoose = require('mongoose');


describe('tweet model', ()=>{
    it('has a user and body field', ()=>{
        const id = new mongoose.Types.ObjectId();
        const tweet = new Tweets({
            user: id,
            body: 'my first tweet'
        });
        expect(tweet.toJSON()).toEqual({
            user: id,
            body: 'my first tweet',
            _id: expect.any(mongoose.Types.ObjectId)
        });
        // console.log('tweet in test', tweet);
        // console.log('tweet to json', tweet.toJSON());
   
    });
    it('has a required user field', ()=>{
        const tweet = new Tweets({
            body: 'testing'
        });
        const error = tweet.validateSync().errors;
        expect(error.user.message).toBe('Path `user` is required.');
    });
    it('makes sure max length of body is 256 char', ()=>{
        const body = 't'.repeat(300);
        const tweet = new Tweets({
            body: 't'.repeat(300),
            user:'5850458058094850'
        });
        const errors = tweet.validateSync().errors;

        expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
    });
    



});


