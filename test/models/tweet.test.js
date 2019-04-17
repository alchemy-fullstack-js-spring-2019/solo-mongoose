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

  it('has required body', () => {
    const tweet = new Tweet({
      handle: 'zealous zebra',
    });

    const errors = tweet.validateSync().errors;
  
    expect(errors.body.message).toEqual('Path `body` is required.');
  });

  it('has required handle', () => {
    const tweet = new Tweet({
      body: 'Where lies the strangling fruit that came from the hand of the sinner I shall bring forth the seeds of tnpmhe dead to share with the worms'
    });

    const errors = tweet.validateSync().errors;
  
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

});

