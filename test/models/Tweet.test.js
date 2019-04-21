const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');


describe('Schema Tests', () => {
  it('Has a handle and a body field', () => {
    const tweet = new Tweet({
      handle: 'cosmo',
      body: 'I am testing a tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'cosmo',
      body: 'I am testing a tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a body but no handle', () => {
    const tweet = new Tweet({
      body: 'this is a handleless body'
    });

    const errors = tweet.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has a handle but no body', () => {
    const tweet = new Tweet({
      handle: 'Ichabod Crane'
    });

    const errors = tweet.validateSync().errors;


    expect(errors.body.message).toEqual('Path `body` is required.');
  });

  it('has more than the max number of characters', () => {
    const body = 'a'.repeat(300);
    const tweet = new Tweet({
      handle: 'cosmo',
      body
    });

    const errors = tweet.validateSync().errors;
    
    expect(errors.body.message).toEqual('Path `body` (`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`) is longer than the maximum allowed length (256).');
  });
});
