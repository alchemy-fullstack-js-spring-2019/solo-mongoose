const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27107/tweets', { 
      useNewUrlParser: true 
    });
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterEach(() => {
    return mongoose.connection.close();
  });

  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'cara',
        text: 'tweets have text'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cara',
          text: 'tweets have text',
          _id: expect.any(String)
        });
      });
  });
});
