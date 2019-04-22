const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model test', () => {
  it('has a handle a handle, name, email', () => {
    const user = new User({
      handle: 'furiousfox',
      name: 'squirreleater',
    });
    expect(user.toJSON()).toEqual({
      handle: 'furiousfox',
      name: 'squirreleater',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required handle', () => {
    const user = new User({ 
      name: 'gerald'
    });

    const errors = user.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

});
