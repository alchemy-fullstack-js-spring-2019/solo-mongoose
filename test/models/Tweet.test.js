const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  const id = new mongoose.Types.ObjectId;
  it('has a user and body field', () => {
    const tweet = new Tweet({
      user: id,
      body: 'my tweet',
    });

    expect(tweet.toJSON()).toEqual({
      user: id,
      body: 'my tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has required body', () => {
    const tweet = new Tweet({ body: 'pizza is life' });
    const errors = tweet.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
  });

  it('has body within max length 256', () => {
    const body = 'a'.repeat(300);
    const tweet = new Tweet({ handle: 'georie', body });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });

});
