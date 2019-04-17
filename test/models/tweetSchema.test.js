const mongoose = require('mongoose');
const TweetSchema = require('../../lib/models/tweetSchema.js');

describe('tests the "properties", you could say, of the tweet schema/tweet model', () => {
  it('creates a tweet with both a handle and a body, thus results in no error', () => {
    const tweet = new TweetSchema({
      handle: 'intro_mode',
      body: 'tweet beep'
    });
    expect(tweet.toJSON()).toEqual({
      handle: 'intro_mode',
      body: 'tweet beep',
      _id: expect.any(mongoose.Types.ObjectId)
      //why are where saying toJSON?
    });
  });
  it('only has a handle, thus resulting in path "body" required error', () => {
    const tweet = new TweetSchema({
      handle: 'intro_mode'
    });
    const errors = tweet.validateSync().errors;
    //errors.body.message because since we dont have a body, the error message will be in the body object. assuming its an object within an errors object
    expect(errors.body.message).toEqual('Path `body` is required.');
  });
  it('only has a body, thus resulting in an error on the the handle object of path "handle" required', () => {
    const tweet = new TweetSchema({
      body: 'tweet beep'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });
  it('checks that the length of the tweet isn\'t over the max length, in this test it will be and will result in an error message on the body stating length too long', () => {
    const body = 'a'.repeat(300);
    const tweet = new TweetSchema({
      handle: 'intro_mode',
      body
    });
    const errors = tweet.validateSync().errors;

    expect(errors.body.message).toEqual('Path `body` (`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`) is longer than the maximum allowed length (256).');
  });
});
//Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`


