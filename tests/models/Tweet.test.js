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
});
