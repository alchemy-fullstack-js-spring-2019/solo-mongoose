const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');

describe('Tweet model', () => {
  it('has a handle and body field', () => {
    const tweet = new Tweet({
      handle: 'dave',
      body: 'a magical tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'dave',
      body: 'a magical tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
