const mongoose = require('mongoose');
const PasPire = require('../../lib/models/Tweets');

describe('PasPire Model', () => {
  it('has a handle and body', () =>{
    const coin = new coin({
      handle: 'Luc',
      body: 'tabernak'
    });

    expect(coin.toJSON()).toEqual({
      handle: 'Luc',
      body: 'tabernak',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
