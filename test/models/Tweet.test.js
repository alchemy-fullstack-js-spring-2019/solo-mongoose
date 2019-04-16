const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a handle and body field', () => {
    const tweet = new Tweet({
      handle: 'ryan',
      body: 'my tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'ryan',
      body: 'my tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });



});
