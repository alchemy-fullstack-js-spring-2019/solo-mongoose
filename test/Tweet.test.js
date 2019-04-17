const Tweet = require('../lib/models/Tweet');
const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId;

describe('Tweet model test', () => {
  it('has a handle and a body', () => {
    const tweet = new Tweet({ handle: id, body: 'hello' });
    expect(tweet.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      handle: id,
      body: 'hello'
    });
  });

  it('requires the handle', () => {
    const tweet = new Tweet({ body: 'uh oh' });
    const errors = tweet.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });
});
