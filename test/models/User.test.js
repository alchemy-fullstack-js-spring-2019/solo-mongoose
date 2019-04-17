const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('userSchema tests', () => {
  it('creates a new instance of user', () => {
    const expected = {
      handle: 'sup.tommy',
      name: 'Tommy Tran',
      email: 'tommytran@email.com',
      _id: expect.any(mongoose.Types.ObjectId)
    };
    const user = new User({
      handle: 'sup.tommy',
      name: 'Tommy Tran',
      email: 'tommytran@email.com',
    });
    const error = user.validateSync();
    
    expect(error).toBeFalsy();
    expect(user.toJSON()).toEqual(expected);
  });

  it('requires a proper email (structure)', () => {
    const user = new User({
      handle: 'sup.tommy',
      name: 'Tommy Tran',
      email: 'tommytranemail.com',
    });
    const error = user.validateSync();
    
    expect(error).toBeTruthy();
  });
});
