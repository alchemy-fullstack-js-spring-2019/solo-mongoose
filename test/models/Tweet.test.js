const mongoose = require('mongoose');
const Tweet = require('../../lib/models/tweet');

describe('Tweet model', () => {
  it('has a handle and a body field', () => {
    const tweet = new Tweet({
      handle: 'bonnie',
      body: 'my first tweet'
    });

    expect(tweet.toJSON()).toEqual({
      handle: 'bonnie',
      body: 'my first tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required body field', () => {
    const tweet = new Tweet({
      handle: 'b'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `body` is required.');
  });

  it('has a required handle field', () => {
    const tweet = new Tweet({
      body: 'this is my new tweet but I dont have a handle!'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has a body with max length 256', () => {
    const body = 'a'.repeat(300);
    const tweet = new Tweet({
      handle: 'bonnie', 
      body
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });

});

