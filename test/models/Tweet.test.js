const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

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

  it('has a required handle field', () => {
    const tweet = new Tweet({
      body: 'my first tweet'
    });

    const errors = tweet.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has a required body field', () => {
    const tweet = new Tweet({
      handle: 'Mal'
    });

    const errors = tweet.validateSync().errors;

    expect(errors.body.message).toEqual('Path `body` is required.');
  });
});
