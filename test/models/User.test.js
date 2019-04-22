const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('user model', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/users', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can add a user with handle, name, and email', () => {
    const user = new User({
      handle: 'The First User',
      name: 'First User Name',
      email: 'first@testuser.com'
    });
    expect(user.toJSON()).toEqual({
      handle: 'The First User',
      name: 'First User Name',
      email: 'first@testuser.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('can check that required handle is present in a created user', () => {
    const user = new User({
      name: 'Frances',
      email: 'i-check@handle-and-name-and@email.com'
    });
    const errors = user.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

});
