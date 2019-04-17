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

  it('has required name field', () => {
    const toy = new Toy({
      color: 'green'      
    });

    const errors = toy.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has required description field', () => {
    const toy = new Toy({
      name: 'the pickle',
      color: 'green'
    });

    const errors = toy.validateSync().errors;
    expect(errors.description.message).toEqual('Path `description` is required.');
  });

});

