const Dog = require('../../lib/models/Dog');
const mongoose = require('mongoose');

describe('Dog model', () => {
  it('has name, breed, and age fields', () => {
    const dog = new Dog({
      name: 'toto',
      breed: 'yorkie',
      age: 10
    });
    expect(dog.toJSON()).toEqual({
      name: 'toto',
      breed: 'yorkie',
      age: 10,
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('has a required name field', () => {
    const dog = new Dog({
      breed: 'terrier',
      age: 14
    });
    const errors = dog.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  it('has a required age field', () => {
    const dog = new Dog({
      name: 'cutie',
      breed: 'hound',
    });
    const errors = dog.validateSync().errors;
    expect(errors.age.message).toEqual('Path `age` is required.');
  });
  it('has a max age of 19', () => {
    const dog = new Dog({
      name: 'bear',
      breed: 'samoyed',
      age: 25
    });
    const errors = dog.validateSync().errors;
    expect(errors.age.message).toEqual('Path `age` (25) is more than maximum allowed value (19).');
  });
});
