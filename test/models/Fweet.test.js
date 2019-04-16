const mongoose = require('mongoose');
const Fweet = require('../../lib/models/Fweet');

describe('Fweet model', () => {
  it('creates a fweet with a handle and body', () => {
    const fweet = new Fweet({
      handle: 'chris',
      body: 'this is a tweet'
    });

    expect(fweet.toJSON()).toEqual({
      handle: 'chris',
      body: 'this is a tweet',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle field', () => {
    const fweet = new Fweet({
      body: 'this is a tweet without a handle'
    });

    const errors = fweet.validateSync().errors;

    expect(errors.handle.message).toBe('Path `handle` is required.');
  }); 

  it('has a required body field', () => {
    const fweet = new Fweet({
      handle: 'nobody'
    });

    const errors = fweet.validateSync().errors;

    expect(errors.body.message).toBe('Path `body` is required.');
  }); 

  it('has a maxlength of 140 in body field', () => {
    const body = 'hi'.repeat(71);
    const fweet = new Fweet({
      handle: 'chris',
      body
    });

    const errors = fweet.validateSync().errors;

    expect(errors.body.message).toBe(`Path \`body\` (\`${body}\`) is longer than the maximum allowed length (140).`);
  }); 
});
