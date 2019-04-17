const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a user and body field', () => {
    const id = new mongoose.Types.ObjectId();
    const tweet = new Tweet({
      user: id,
      body: 'this is a tweet'
    });

    expect(tweet.toJSON()).toEqual({
      user: id,
      body: 'this is a tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required user field', () => {
    const tweet = new Tweet({
      body: 'who needs a stinking handle'
    });

    const errors = tweet.validateSync().errors;

    expect(errors.user.message).toEqual('Path `user` is required.');
  });
  //TODO needs a user id
  it('has a required body field', () => {
    const tweet = new Tweet({
      user: 'cheri'
    });
    
    const errors = tweet.validateSync().errors;
    
    expect(errors.body.message).toEqual('Path `body` is required.');
  });
//TODO nees user id
  it('has a body with max length of 256', () => {
    const body = 'a'.repeat(300);
    const tweet = new Tweet({
      name: 'cheri',
      body
    });

    const errors = tweet.validateSync().errors;

    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });
});
