const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a handle and body field', () => {
    const tweet = new Tweet({
      handle: 'ryan',
      body: 'my tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'ryan',
      body: 'my tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle', () => {
    const tweet = new Tweet({ handle: 'dave' });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `body` is required.');
  });

  it('has required body', () => {
    const tweet = new Tweet({ body: 'pizza is life' });
    const errors = tweet.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has body within max length 256', () => {
    const body = 'a'.repeat(300);
    const tweet = new Tweet({ handle: 'georie', body });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });

});
