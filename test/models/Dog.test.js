const mongoose = require('mongoose');
const Dog = require('../../lib/models/Dog');

describe('Dogs', () => {
  it('has a handle and a body', () => {
    const dog = new Dog({
      name: 'Tommy',
      age: 12
    });
    
    expect(dog.toJSON()).toEqual({
      name: 'Tommy',
      age: 12,
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
