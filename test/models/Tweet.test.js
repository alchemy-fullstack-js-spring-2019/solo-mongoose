const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('tweet model', () => {
  it('can add a tweet, with user and body fields', () => {
    const tweet = new Tweet({
      user: mongoose.Types.ObjectId(),
      body: 'first tweet from user bliss',
    });
    expect(tweet.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      body: 'first tweet from user bliss',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('can has a required body', () => {
    const tweet = new Tweet({
      user: 'Headless One'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `body` is required.');
  });
});
