const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');
const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId;

describe('Tweet model test', () => {
  it('has a handle and a body', () => {
    const user = new User({ 
      handle: 'sillyrabbit', 
      name: 'Trixie Mattel', 
      email: 'trix@email.com' 
    });
    console.log('user:', user);
    const tweet = new Tweet({ user: user._id, body: 'hello' });
    console.log('tweet:', tweet);
    expect(tweet.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      user: user._id,
      body: 'hello'
    });
  });

  // it('requires the handle', () => {
  //   const tweet = new Tweet({ body: 'uh oh' });
  //   const errors = tweet.validateSync().errors;

  //   expect(errors.handle.message).toEqual('Path `handle` is required.');
  // });
});
