const mongoose = require('mongoose');
const Tweet = require('../../lib/models/Tweet');

describe('Tweet model', ()=> {
  it('has a user and body', ()=> {
    const id = new mongoose.Types.ObjectId();
    const tweet = new Tweet({
      user: id,
      body: 'my cool tweet'
    });
    expect(tweet.toJSON()).toEqual({
      user: id,
      body: 'my cool tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required userfield', ()=> {
    const tweet = new Tweet({
      body: 'my cool tweet'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
  });

  it('has a max body length of 256', ()=> {
    const id = new mongoose.Types.ObjectId();
    const body = 'a'.repeat(260);
    const tweet = new Tweet({
      user: id,
      body
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (256).`);
  });
});
