const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a handle and a body field', () => {
    const tweet = new Tweet({
      user: mongoose.Types.ObjectId(),
      body: 'my first tweet'
    });

    expect(tweet.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      body: 'my first tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required body field', () => {
    const tweet = new Tweet({
      user: mongoose.Types.ObjectId()
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `body` is required.');
  });

  it('has a required user field', () => {
    const tweet = new Tweet({
      body: 'this is my new tweet but I dont have a handle!'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
  });

  it('has a body with max length 256', () => {
    const body = 'a'.repeat(300);
    const tweet = new Tweet({
      handle: mongoose.Types.ObjectId(), 
      body
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });

});

