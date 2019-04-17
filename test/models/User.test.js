const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {

  it('has a handle', () => {
    const user = new User({
      handle: 'bonnie' 
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      handle: 'bonnie',
      image: 'https://via.placeholder.com/250'
    });  
  });

  it('has a required handle field', () => {
    const user = new User({
      image: './image.file'
    });
    const errors = user.validateSync().errors;
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has an image', () => {
    const user = new User({
      handle: 'bbm',
      image: './image.file'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      handle: 'bbm',
      image: './image.file'
    });  
  });

});
