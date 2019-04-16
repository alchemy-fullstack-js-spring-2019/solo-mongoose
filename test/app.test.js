const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/models/Tweets');

describe('tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tweets', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'Luc', body: 'tabernak' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Luc',
          body: 'tabernak',
          _id: expect.any(String),
          __v: 0
        });
      });
  });


});


