const mongoose = require('mongoose');
const Dog = require('../../lib/models/Dog');

describe('Dog model', () => {
  it('has a owner, name, age and breed', () => {
    const id = new mongoose.Types.ObjectId();
    const dog = new Dog({
      owner: id,
      name: 'buddy',
      age: 5,
      breed: 'golden retriever'
    });

    expect(dog.toJSON()).toEqual({
      owner: id,
      name: 'buddy',
      age: 5,
      breed: 'golden retriever',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required name field', () => {
    const dog = new Dog({
      age: 5,
      breed: 'golden retriever'
    });

    const errors = dog.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required age field', () => {
    const dog = new Dog({
      name: 'buddy',
      breed: 'golden retriever'
    });

    const errors = dog.validateSync().errors;
    expect(errors.age.message).toEqual('Path `age` is required.');
  });

  it('has a required breed field', () => {
    const dog = new Dog({
      name: 'buddy',
      age: 5
    });

    const errors = dog.validateSync().errors;
    expect(errors.breed.message).toEqual('Path `breed` is required.');
  });
});
