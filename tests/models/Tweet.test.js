const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');

describe('tweet model', () => {
  it('has a handle and body field', () => {
    const tweet = new Tweet({
      handle: 'meg',
      body: 'tweeting is so fun'
    });
    expect(tweet.toJSON()).toEqual({
      handle: 'meg',
      body: 'tweeting is so fun',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle field', () => {
    const tweet = new Tweet({
      body: 'I can\'t even tell you how much I like tweeting'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has a required body field', () => {
    const tweet = new Tweet({
      handle: 'megs'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `body` is required.');
  });
});
