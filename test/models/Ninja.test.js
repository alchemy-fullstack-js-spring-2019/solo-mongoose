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
    
  });

});
