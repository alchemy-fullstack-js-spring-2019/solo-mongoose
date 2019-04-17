const mongoose = require('mongoose');
const UserSchema = require('../../lib/models/userSchema.js');

describe('tests the user schema', () => {
  it('makes a user with both handle and an email, thus resulting in no error', () => {
    const user = new UserSchema({
      handle: 'intro_mode',
      email: 'intro_mode@gmail.com'
    });
    expect(user.toJSON()).toEqual({
      handle: 'intro_mode',
      email: 'intro_mode@gmail.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('makes a user with only a handle, resulting in an error message on the email object', () => {
    const user = new UserSchema({
      handle: 'intro_mode'
    });
    //does the user schema have an object specifically for error messages? what exactly is validateSync() doing?
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
  it('creates a user with only the email, thus resulting in an error on the handle object', () => {
    const user = new UserSchema({
      email: 'intro_mode@gmail.com'
    });
    const errors = user.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });
});
