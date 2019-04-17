const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('User model', () => {
  it('has a handle and email field', () => {
    const tweet = new User({
      handle: 'dave',
      email: 'dcornelius@gmail.com'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'dave',
      email: 'dcornelius@gmail.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle field', () => {
    const tweet = new User({
      email: 'dcornelius@gmail.com'
    });

    const errors = tweet.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });
  it('has a required email field', () => {
    const tweet = new User({
      handle: 'dave'
    });

    const errors = tweet.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
});
