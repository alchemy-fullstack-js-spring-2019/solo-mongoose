const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a handle and body field', () => {
    const tweet = new Tweet({
      handle: 'emily',
      body: 'first tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'emily',
      body: 'first tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle field', () => {
    const tweet = new Tweet({
      body: 'my first tweet'
    });

    const errors = tweet.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has a required body field', () => {
    const tweet = new Tweet({
      handle: 'emily'
    });

    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `body` is required.');
  });

  it('has a body with a max length 256', () => {
    const body = 'a'.repeat(300);
    const tweet = new Tweet({
      handle: 'emily',
      body
    });

    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });
});
