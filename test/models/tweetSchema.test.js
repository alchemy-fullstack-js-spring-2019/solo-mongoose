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
      //why not string again?
    });
  });
});
