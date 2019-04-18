const User = require('../../lib/models/User');
const mongoose = require('mongoose');
describe('User model tests', () => {

  it('has a handle and an image', () => {
    const user = new User({
      handle: 'Cosmo',
      image: 'image:URL'
    });
  
    expect(user.toJSON()).toEqual({
      handle: 'Cosmo',
      image: 'image:URL',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has no handle', ()=> {
    const user = new User({
      image: 'image:URL'
    });

    const errors = user.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('handle cannot have more than 16 characters', () => {
    const user = new User({
      handle: 'ZAMMABLAMMAZAMMABLAMMA',
      image: ''
    });

    const errors = user.validateSync().errors;

    expect(errors.handle.message).toEqual('Path `handle` (`ZAMMABLAMMAZAMMABLAMMA`) is longer than the maximum allowed length (16).');

  });


});

