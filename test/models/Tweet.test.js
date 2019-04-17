const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweets');

describe('Tweet Model', () => {
  it('has a handle and body', () =>{
    const tweet = new Tweet({
      handle: 'Luc',
      body: 'tabernak'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'Luc',
      body: 'tabernak',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
