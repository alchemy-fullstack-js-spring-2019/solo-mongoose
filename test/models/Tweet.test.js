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
      _id: expect.any(mongoose.Tyles.ObjectId)
    });
  });

  it('has a required handle and field', () => {
    const tweet = new Tweet({
      handle: 'cara'
    });
    
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `text` is required');
  });
});
