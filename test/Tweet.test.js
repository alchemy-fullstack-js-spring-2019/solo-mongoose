const Tweet = require('../lib/models/Tweet');
const mongoose = require('mongoose');

describe('Tweet model test', () => {
  it('has a handle and a body', () => {
    const tweet = new Tweet({ handle: 'ben', body: 'hello' });
    expect(tweet.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      handle: 'ben',
      body: 'hello'
    });
  });
});
