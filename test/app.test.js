const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('App tests', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tweets', { useNewUrlParser: true });
  });
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('adds tweet (w/ tags) to database with POST', () => {
    return request(app)
      .post('/tweets').send({
        handle: 'Tommy',
        body: 'Tweet 5',
        tags: ['testing', 'jest', 'supertest']
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'Tweet 5',
          tags: ['testing', 'jest', 'supertest'],
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('adds tweet (w/o tags) to database with POST', () => {
    return request(app)
      .post('/tweets').send({
        handle: 'Tommy',
        body: 'Tweet 5',
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'Tweet 5',
          tags: [],
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
