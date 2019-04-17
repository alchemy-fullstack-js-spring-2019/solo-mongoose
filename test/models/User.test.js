const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('Users', () => {
  it('has a handle, name, and email', () => {
    const user = new User({
      handle: '@emilycre',
      name: 'emily',
      email: 'emily@ACL.com'
    });

    expect(user.toJSON()).toEqual({
      handle: '@emilycre',
      name: 'emily',
      email: 'emily@ACL.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
