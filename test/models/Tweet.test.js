const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  const id = new mongoose.Types.ObjectId;

  it('has a handle and a body field', () => {
    const tweet = new Tweet({
      user: id,
      body: 'the first tweet'
    });

    expect(tweet.toJSON()).toEqual({
      user: id,
      body: 'the first tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('the tweet as a required handle field', () => {
    const tweet = new Tweet ({
      body: 'the first tweet without a user'
    });

    const errors = tweet.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
  });

  it('has a required body field',  () => {
    const tweet = new Tweet ({
      user: id
    });

    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `body` is required.');
  });

  it('has a body with max of 256 characters', () => {
    const body = 'oo'.repeat(256);
    const tweet = new Tweet ({
      user: 'laura',
      body
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toBe(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });
});
