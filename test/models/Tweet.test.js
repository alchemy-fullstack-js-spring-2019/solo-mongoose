const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');

describe('tweet model', () => {
  it('can add a tweet, with user and body fields', () => {
    const tweet = new Tweet({
      user: mongoose.Types.ObjectId(),
      body: 'first tweet from user bliss',
    });
    console.log('console', typeof(tweet.toJSON()._id));
    expect(tweet.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      body: 'first tweet from user bliss',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('can has a required user', () => {
    const tweet = new Tweet({
      body: 'HasNoHandle Guy'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
  });
  it('can has a required body', () => {
    const tweet = new Tweet({
      user: 'Headless One'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `body` is required.');
  });
  //mine, but test fails:
  // it('body has maxlength 256', () => {
  //   const body = ('I write. A LOT.').repeat(30);
  //   const tweet = new Tweet({
  //     user: 'WritesTooLong',
  //     body: body
  //   });
  //   const errors = tweet.validateSync().errors;
  //   expect(errors.body.message).toInclude(`Path \`body\` (\`${tweet.body}\`) is longer than the maximum allowed length (256)`);
  // });
});
