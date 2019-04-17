const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('creates User', () =>{
  it('makes a user with handle/name/email', () =>{
    const user = new User({
      handle: 'handler',
      name: 'tester',
      email: 'test@test.com'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      handle: 'handler',
      name: 'tester',
      email: 'test@test.com'
    });
  });

  it('has a required handle field', () => {
    const user = new User({
      name: 'my first tweet'
    });

    const errors = user.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });
});
