const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a handle and body field', () => {
    const tweet = new Tweet({
      handle: 'cheri',
      body: 'this is a tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'cheri',
      body: 'this is a tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle field', () => {
    const tweet = new Tweet({
      body: 'who needs a stinking handle'
    });

    const errors = tweet.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });
  
  it('has a required body field', () => {
    const tweet = new Tweet({
      handle: 'cheri'
    });
    
    const errors = tweet.validateSync().errors;
    
    expect(errors.body.message).toEqual('Path `body` is required.');
  });
});
