const Users = require('../../lib/models/Users');
const mongoose = require('mongoose');

describe('User model', () => {
  it('makes a user with a handle/name/email/image', () => {
    const users = new Users({
      handle: 'user1',
      name: 'name',
      email: 'name@email.com'
    });
    expect(users.toJSON()).toEqual({
      handle: 'user1', 
      name: 'name',
      email: 'name@email.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('has a required handle field', () => {
    const users = new Users({
      name: 'name',
      email: 'name@email.com',
      _id: expect.any(mongoose.Types.ObjectId),
    });
    const error = users.validateSync().errors;
    expect(error.handle.message).toEqual('Path `handle` is required.');
  });
  
});
