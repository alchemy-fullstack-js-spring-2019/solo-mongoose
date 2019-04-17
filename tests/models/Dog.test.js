const Dog = require('../../lib/models/Dog');
const mongoose = require('mongoose');

describe('Dog model', () => {
  it('has name, handle, and email fields', () => {
    const dog = new Dog({
      name: 'toto',
      handle: 'yorkie',
      email: 'toto@yorkie.com'
    });
    expect(dog.toJSON()).toEqual({
      name: 'toto',
      handle: 'yorkie',
      email: 'toto@yorkie.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('has a required name field', () => {
    const dog = new Dog({
      handle: 'terrier',
      email: 'funny@twrrier.com'
    });
    const errors = dog.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  it('has a required email field', () => {
    const dog = new Dog({
      name: 'cutie',
      handle: 'hound',
    });
    const errors = dog.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
});
