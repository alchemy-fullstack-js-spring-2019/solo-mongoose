const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../lib/app');
//const Tweet = require('../lib/models/Tweet');

describe('tweet routes', ()=> {
  beforeAll(()=> {
    return mongoose.connect('mongodb:localhost:27107/tweets', {
      useFindAndModify: false,
      useNewUrlParse: true,
      useCreateIndex: true
    });
  });

  beforeEach(()=> {
    return mongoose.connection.dropDatabase();
  });

  afterAll(()=> {
    return mongoose.connection.close();
  });

  it('can create a new tweet', ()=> {
    return request(app)
      .post('/tweets')
      .send({ handle: 'emily', body: 'my cool tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emily',
          body: 'my cool tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
