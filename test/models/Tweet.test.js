const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');


describe('tweetSchema tests', () => {
  it('creates a new instance of tweet', () => {
    const expected = {
      handle: 'Tommy',
      body: 'tweet4',
      tags: [],
      _id: expect.any(mongoose.Types.ObjectId)
    };
    const input = {
      handle: 'Tommy',
      body: 'tweet4'
    };
    const result = new Tweet(input);

    expect(result.toJSON()).toEqual(expected);
  });
});
