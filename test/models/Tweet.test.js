const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');

describe('tweet model', () => {
  it('has a handle and body', () => {
    const tweet = new Tweet({
      handle: 'bliss',
      body: 'first tweet from bliss'
    });
    console.log('console', typeof(tweet.toJSON()._id));
    expect(tweet.toJSON()).toEqual({
      handle: 'bliss',
      body: 'first tweet from bliss',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
