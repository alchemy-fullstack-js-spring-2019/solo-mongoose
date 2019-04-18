const mongoose = require('mongoose');
const Dog = require('../../lib/models/Dog');

describe('Dogs', () => {
  it('has a handle and a body', () => {
    const id = new mongoose.Types.ObjectId();
    const dog = new Dog({
      name: id,
      age: 12
    });
    expect(dog.toJSON()).toEqual({
      name: id,
      age: 12,
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('requires name', () => {
    const dog = new Dog({
      age: 12
    });
    const errors = dog.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('requires age', () => {
    const dog = new Dog({
      name: 'Todd'
    });
    const errors = dog.validateSync().errors;
    expect(errors.age.message).toEqual('Path `age` is required.');
  });
  
  it('won\'t accept ages less than 0', () => {
    const dog = new Dog({
      name: 'Scott',
      age: -2
    });
    const errors = dog.validateSync().errors;
    expect(errors.age.message).toEqual('Path `age` (-2) is less than minimum allowed value (0).');
  });
});
