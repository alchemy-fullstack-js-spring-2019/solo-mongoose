const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

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
      .send({ handle: 'cheri', body: 'a fine tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cheri',
          body: 'a fine tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
