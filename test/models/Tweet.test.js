const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');

describe('tweet model', () => {


  it('has a handle and text', () => {
    const tweet = new Tweet({
      user: new mongoose.Types.ObjectId(),
      text: 'Hey'
    });
    
    expect(tweet.toJSON()).toEqual({
      text: 'Hey',
      user: expect.any(mongoose.Types.ObjectId),
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle field', () => {
    const tweet = new Tweet({

      text: 'my first tweet'
    });

    const errors = tweet.validateSync().errors;

    expect(errors.user.message).toEqual('Path `user` is required.');
  });

  it('has a required body field', () => {
    const tweet = new Tweet({
      handle: 'ryan'
    });

    const errors = tweet.validateSync().errors;

    expect(errors.text.message).toEqual('Path `text` is required.');
  });

  it('has a body with maxlength 256', () => {
    const text = 'a'.repeat(300);
    const tweet = new Tweet({
      handle: 'ryan',
      text
    });

    const errors = tweet.validateSync().errors;

    expect(errors.text.message).toEqual(`Path \`text\` (\`${text}\`) is longer than the maximum allowed length (256).`);
  });

});
