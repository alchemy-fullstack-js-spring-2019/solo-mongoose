const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('has name, description, color, and condition fields', () => {
    const user = new User({
      name: 'the pickle', 
      description: 'fuzzy pickle',
      color: 'green',
      condition: 'squeaker in critical condition'
    });
    
    expect(user.toJSON()).toEqual({
      name: 'the pickle', 
      description: 'fuzzy pickle',
      color: 'green',
      condition: 'squeaker in critical condition',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has required name field', () => {
    const user = new User({
      color: 'green'      
    });

    const errors = user.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has required description field', () => {
    const user = new User({
      name: 'the pickle',
      color: 'green'
    });

    const errors = user.validateSync().errors;
    expect(errors.description.message).toEqual('Path `description` is required.');
  });
  
  it('has required condition field', () => {
    const user = new User({
      name: 'the pickle',
      description: 'fuzzy pickle',
      color: 'green'
    });

    const errors = user.validateSync().errors;
    expect(errors.condition.message).toEqual('Path `condition` is required.');
  });
});
