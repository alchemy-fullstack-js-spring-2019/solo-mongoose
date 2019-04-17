const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('creates a user with a handle, name, and email', () => {
    const user = new User({
      handle: 'chris18',
      name: 'chris',
      email: 'test@test.com'
    });

    expect(user.toJSON()).toEqual({
      handle: 'chris18',
      name: 'chris',
      email: 'test@test.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle field', () => {
    const user = new User({
      name: 'chris',
      email: 'test@test.com'
    });

    const errors = user.validateSync().errors;
    expect(errors.handle.message).toBe('Path `handle` is required.');
  });
  
  it('has a required name field', () => {
    const user = new User({
      handle: 'chris',
      email: 'test@test.com'
    });

    const errors = user.validateSync().errors;
    expect(errors.name.message).toBe('Path `name` is required.');
  });

  it('has a required email field', () => {
    const user = new User({
      handle: 'chris17',
      name: 'chris'
    });

    const errors = user.validateSync().errors;
    expect(errors.email.message).toBe('Path `email` is required.');
  });
});
