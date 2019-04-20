const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('has a handle, name and email', () => {
    const user = new User({
      handle: '@leslie',
      name: 'leslie',
      email: 'leslie@gmail.com'
    });

    expect(user.toJSON()).toEqual({
      handle: '@leslie',
      name: 'leslie',
      email: 'leslie@gmail.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has required handle field', () => {
    const user = new User({
      name: 'leslie',
      email: 'leslie@gmail.com'
    });

    const errors = user.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has required name field', () => {
    const user = new User({
      handle: '@leslie',
      email: 'leslie@gmail.com'
    });

    const errors = user.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has required email field', () => {
    const user = new User({
      handle: '@leslie',
      name: 'leslie'
    });

    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
});
