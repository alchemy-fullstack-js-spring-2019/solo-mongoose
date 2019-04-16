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
  })
});
