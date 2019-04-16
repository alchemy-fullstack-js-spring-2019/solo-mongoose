const mongoose = require('mongoose');
const userSchema = require('../../lib/models/User');

describe('User model test', () => {
  it('has a handle a handle, name, email', () => {
    const user = new userSchema({
      handle: 'furiousfox',
      name: 'squirreleater',
    });
    expect(user.toJSON()).toEqual({
      handle: 'furiousfox',
      name: 'squirreleater',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

});
