const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet unit test', () => {
  it('has a handle and body', () => {
    const tweet = new Tweet({
      handle: 'vapid viper',
      body: 'The shadows of the abyss are like the petals of a monstrous flower that shall blossom within the skull'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'vapid viper',
      body: 'The shadows of the abyss are like the petals of a monstrous flower that shall blossom within the skull',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

});
