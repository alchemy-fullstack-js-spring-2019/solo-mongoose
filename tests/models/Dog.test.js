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
});
