const Tweet = require('../../lib/models/Tweet');
const mongoose = require('mongoose');

describe('tweet model', () => {


  it('has a handle and text', () => {
    const tweet = new Tweet({
      handle: 'Sean',
      text: 'Hey'
    });
    
    expect(tweet.toJSON()).toEqual({
      handle: 'Sean',
      text: 'Hey',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('has a required handle field', () => {
    const tweet = new Tweet({
      text: 'my first tweet'
    });

    const errors = tweet.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
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

    console.log(tweet);
    const errors = tweet.validateSync().errors;

    expect(errors.text.message).toEqual(`Path \`body\` (\`${text}\`) is longer than the maximum allowed length (256).`);
  });

});
