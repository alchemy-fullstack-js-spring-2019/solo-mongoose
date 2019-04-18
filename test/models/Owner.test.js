const mongoose = require('mongoose');
const Owner = require('../../lib/models/Owner');

describe('owner', () => {
  it('has a name and email', () => { 
    const owner = new Owner({
      name: 'Clem',
      email: 'clemjim90@hotmail.com'
    });
    expect(owner.toJSON()).toEqual({
      name: 'Clem',
      email: 'clemjim90@hotmail.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  
  it('name required', () => {
    const owner = new Owner({
      email: 'clemjim90@hotmail.com'
    });
    const errors = owner.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  
  it('email required', () => {
    const owner = new Owner({
      name: 'Clem'
    });
    const errors = owner.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
});
