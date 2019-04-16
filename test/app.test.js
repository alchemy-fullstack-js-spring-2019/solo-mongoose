const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('app', () => {

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


  it('creates a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ 
        handle: 'gustof', 
        body: 'yo hey there friends' 
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'gustof', 
          body: 'yo hey there friends',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
