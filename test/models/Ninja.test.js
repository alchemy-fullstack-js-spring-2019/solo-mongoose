const mongoose = require('mongoose');
const Ninja = require('../../lib/models/Ninja');

describe('NINJA MODELS TESTS', () => {

  it('has nickname, age, and tagline', () => {
    const ninja = new Ninja({
      nickname: 'Shadow',
      age: 23,
      tagline: 'One with the night'
    });

    expect(ninja.toJSON()).toEqual({
      nickname: 'Shadow',
      age: 23,
      tagline: 'One with the night',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('required nickname', () => {
    const ninja = new Ninja({
      age: 23,
      tagline: 'One with the night'
    });

    const errors = ninja.validateSync().errors;
    expect(errors.nickname.message).toEqual('Path `nickname` is required.');
  });

  it('required age', () => {
    const ninja = new Ninja({
      nickname: 'Shadow',
      tagline: 'One with the night'
    });

    const errors = ninja.validateSync().errors;
    expect(errors.age.message).toEqual('Path `age` is required.');
  });

});
