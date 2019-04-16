const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a handle and body field', () => {
    const tweet = new Tweet({
      handle: 'cheri',
      body: 'this is a tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'cheri',
      body: 'this is a tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
