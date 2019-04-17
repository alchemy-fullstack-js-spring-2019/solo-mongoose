const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');

describe('schema test', () => {
  it('has a user and text field', () => {
    const id = new mongoose.Types.ObjectId;
    const tweet = new Tweet({
      user: id,
      text: 'a tweety tweet'
    });

    expect(tweet.toJSON()).toEqual({
      user: id,
      text: 'a tweety tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required text and field', () => {
    const tweet = new Tweet({
      user: 'cara'
    });

    const errors = tweet.validateSync().errors;
    expect(errors.text.message).toEqual('Path `text` is required.');
  });

  it('has a required user and field', () => {
    const tweet = new Tweet({
      text: 'these tests are not working'
    });

    const errors = tweet.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
  });


});
