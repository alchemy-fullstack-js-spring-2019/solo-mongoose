const Pirate = require('../../lib/models/Pirate');
const mongoose = require('mongoose');

describe('testing Pirate model', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/pirate', { useNewUrlParser: true, useFindAndModify: false });
  });
  beforeEach(() => {
    mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    mongoose.connection.close();
  });
  it('creates a pirate with a name, ship, and pet', () => {
    const pirate = new Pirate({
      name: 'Black Beard', 
      ship: 'The Jolly Roger', 
      pet: 'Squawks'
    });
    expect(pirate.toJSON()).toEqual({
      name: 'Black Beard', 
      ship: 'The Jolly Roger', 
      pet: 'Squawks', 
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('Pirate requires a name', () => {
    const pirate = new Pirate({
      ship: 'A pirate ship',
      pet: 'Polly the Parrot '
    });
    const errors = pirate.validateSync().errors;
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  it('Pirate requires a ship', () => {
    const pirate = new Pirate({
      name: 'First Mate Yarrvey',
      pet: 'Polly the Parrot '
    });
    const errors = pirate.validateSync().errors;
    expect(errors.ship.message).toEqual('Path `ship` is required.');
  });
});
