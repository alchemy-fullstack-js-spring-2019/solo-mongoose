const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a handle and body field', () => {
    const tweet = new Tweet({
      handle: 'Mal',
      body: 'my first tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'Mal',
      body: 'my first tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
