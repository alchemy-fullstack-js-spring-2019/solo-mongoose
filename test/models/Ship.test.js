const Ship = require('../../lib/models/Ship');
const mongoose = require('mongoose');

describe('Testing Ship model', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/ship', { useNewUrlParser: true, useFindAndModify: false });
  });
  beforeEach(() => {
    mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    mongoose.connection.close();
  });
  
  it('creates a ship with a name, owner, and sailCount', () => {
    const newShip = new Ship({
      name: 'The Jolly Roger',
      owner: 'Davy Jones',
      sailCount: 4 
    });
    expect(newShip.toJSON()).toEqual({
      name: 'The Jolly Roger',
      owner: 'Davy Jones',
      sailCount: 4,
      color: 'Brown',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('requires a ship name', () => {
    const newShip = new Ship({
      owner: 'Davy Jones',
      sailCount: 4 
    });
    const errors = newShip.validateSync().errors;

    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
