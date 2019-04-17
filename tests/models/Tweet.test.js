const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');
const Dog = require('../../lib/models/Dog');

describe('tweet model', () => {
  it('has a user and body field', () => {
    const dog = new Dog({
      name: 'rover',
      handle: 'rovedog77',
      email: 'rover@rovedog.com'
    });
    const tweet = new Tweet({
      user: dog._id,
      body: 'tweeting is so fun'
    });
    expect(tweet.toJSON()).toEqual({
      user: dog._id,
      body: 'tweeting is so fun',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required user field', () => {
    const tweet = new Tweet({
      body: 'I can\'t even tell you how much I like tweeting'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
  });

  it('has a required body field', () => {
    const tweet = new Tweet({
      handle: 'megs'
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual('Path `body` is required.');
  });

  it('body has a maxlength of 300 characters', () => {
    const body = 'x'.repeat(301);
    const tweet = new Tweet({
      handle: 'megs',
      body
    });
    const errors = tweet.validateSync().errors;
    expect(errors.body.message).toEqual(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (300).`);
  });
});
