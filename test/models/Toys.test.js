const mongoose = require('mongoose');
const Toy = require('../../lib/models/Toys');

describe('Toys model', () => {
  it('has name, description, color, and condition fields', () => {
    const toy = new Toy({
      name: 'the pickle', 
      description: 'fuzzy pickle',
      color: 'green',
      condition: 'squeaker in critical condition'
    });
    
    expect(toy.toJSON()).toEqual({
      name: 'the pickle', 
      description: 'fuzzy pickle',
      color: 'green',
      condition: 'squeaker in critical condition',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});

