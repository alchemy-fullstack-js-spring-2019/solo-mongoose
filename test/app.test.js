const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tweets', {
      useFindAndMotify: false,
      useCreateIndex: true,
      useNewUrlParser: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'dave', body: 'a magical tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'dave',
          body: 'a magical tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
