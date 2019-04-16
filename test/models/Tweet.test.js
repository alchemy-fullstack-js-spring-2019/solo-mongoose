const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');

describe('schema test', () => {
  it('has a handle and body field', () => {
    const tweet = new Tweet({
      handle: 'cara',
      text: 'a tweety tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'cara',
      text: 'a tweety tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required text and field', () => {
    const tweet = new Tweet({
      handle: 'cara'
    });

    const errors = tweet.validateSync().errors;
    expect(errors.text.message).toEqual('Path `text` is required.');
  });

  it('has a required handle and field', () => {
    const tweet = new Tweet({
      text: 'these tests are not working'
    });

    const errors = tweet.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });


});
