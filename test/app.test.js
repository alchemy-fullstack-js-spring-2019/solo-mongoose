const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('tweet routes', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/tweets', {
      useNewUrlParser: true
    });
  });
  beforeEach(() => {
    //return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'bonnie',
        body: 'my first tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'bonnie',
          body: 'my first tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

});
