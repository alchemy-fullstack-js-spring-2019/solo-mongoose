const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {

  it('has handle, email, and body fields', () => {
    const user = new User({
      handle: 'bonnie',
      name: 'Bonnie McNeil',
      email: 'bonnie@mcneil.com'
    });

    expect(user.toJSON()).toEqual({
      handle: 'bonnie',
      name: 'Bonnie McNeil',
      email: 'bonnie@mcneil.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });  
  });

  it('has a required handle field', () => {
    const user = new User({
      name: 'bonnie', 
      email: 'email@a.com'
    });
    const errors = user.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has a required name field', () => {
    const user = new User({
      handle: 'bonnie', 
      email: 'email@a.com'
    });
    const errors = user.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required email field', () => {
    const user = new User({
      handle: 'bonnie', 
      name: 'B McNeil'
    });
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

});
