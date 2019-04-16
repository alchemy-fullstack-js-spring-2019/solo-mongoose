const Fweet = require('../../lib/models/Fweet');

describe('Fweet model', () => {
  it('creates a fweet with a handle and body', () => {
    Fweet
      .create({
        handle: 'chris',
        body: 'this is a tweet'
      })
      .then(createdTweet => {
        expect(createdTweet.toJSON()).toEqual({
          handle: 'chris',
          body: 'this is a tweet',
          _id: expect.any(String)
        });
      });
  });
});
