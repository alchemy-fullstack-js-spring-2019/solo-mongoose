const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');

describe('tweet model', () => {


  it('has a handle and text', () => {
    const tweet = new Tweet({
      handle: 'Sean',
      text: 'Hey'
    });
    
    expect(tweet.toJSON()).toEqual({
      handle: 'Sean',
      text: 'Hey',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
