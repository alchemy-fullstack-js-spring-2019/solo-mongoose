const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('USER MODELS TESTS', () => {

  it('User has nickname, name, email', () => {
    const user = new User({
      nickname: 'Stealth',
      name: 'Steven',
      email: 'steven@stealth.com'
    });
    expect(user.toJSON()).toEqual({
      nickname: 'Stealth',
      name: 'Steven',
      email: 'steven@stealth.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('required nickname', () => {
    const user = new User({
      name: 'Steven',
      email: 'steven@stealth.com'
    });
    const errors = user.validateSync().errors;
    expect(errors.nickname.message).toEqual(
      'Path `nickname` is required.'
    );
  });

});
