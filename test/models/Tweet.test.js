const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', ()=> {
  it('has a handle and body', ()=> {
    const tweet = new Tweet({
      handle: 'emily',
      body: 'my cool tweet'
    });
    expect(tweet.toJSON()).toEqual({
      handle: 'emily',
      body: 'my cool tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle field', ()=> {
    const tweet = new Tweet({
      body: 'my cool tweet'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has a max body length of 256', ()=> {
    const body = 'a'.repeat(260);
    const tweet = new Tweet({
      handle: 'emily',
      body
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });
});
