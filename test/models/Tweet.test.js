const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a handle and a body field', () => {
    const tweet = new Tweet({
      handle: 'laura',
      body: 'the first tweet'
    });
    expect(tweet.toJSON()).toEqual({
      handle: 'laura',
      body: 'the first tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('the tweet as a required handle field', () => {
    const tweet = new Tweet ({
      body: 'the first tweet'
    });
    const errors = tweet.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });
  it('has a required body field',  () => {
    const tweet = new Tweet ({
      handle: 'laura'
    });
    const errors = tweet.validateSync().errors;

    expect(errors.body.message).toEqual('Path `body` is required.');
  })
  it('has a body with maxlength 256', () => {
    const body = 'o'.repeat(260);
    const tweet = new Tweet ({
      handle: 'laura',
      body
    });
    const errors = tweet.validateSync().errors;

    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });

});
