const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', () => {
  it('has a toyUser and body field', () => {
    const id = new mongoose.Types.ObjectId();
    const tweet = new Tweet({
      toyUser: id,
      body: 'this is a tweet'
    });

    expect(tweet.toJSON()).toEqual({
      toyUser: id,
      body: 'this is a tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle field', () => {
    const tweet = new Tweet({
      body: 'who needs a stinking handle'
    });

    const errors = tweet.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });
  
  it('has a required body field', () => {
    const tweet = new Tweet({
      handle: 'cheri'
    });
    
    const errors = tweet.validateSync().errors;
    
    expect(errors.body.message).toEqual('Path `body` is required.');
  });

  it('has a body with max length of 256', () => {
    const body = 'a'.repeat(300);
    const tweet = new Tweet({
      handle: 'cheri',
      body
    });

    const errors = tweet.validateSync().errors;

    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });
});
