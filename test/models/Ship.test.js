const Ship = require('../../lib/models/Ship');
const Pirate = require('../../lib/models/Pirate');
const mongoose = require('mongoose');

const makeShip = () => {
  const testPirate = new Pirate({ name: 'One Eyed Sam', ship: 'The Glass Slipper', pet: 'Wobbly' });
  return new Ship({ name: 'The Glass Slipper', owner: testPirate._id, sailCount: 1 });
};


describe('Testing Ship model', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/ship', { useNewUrlParser: true, useFindAndModify: false });
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a ship with a name, owner, and sailCount', () => {
    const newShip = makeShip();
    expect(newShip.toJSON()).toEqual({
      name: 'The Glass Slipper',
      owner: expect.any(mongoose.Types.ObjectId),
      sailCount: 1,
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
