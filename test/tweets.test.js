const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('e2e tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/users', {
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

  it('can create a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'angry aardvark',
        body: 'maybe one day we will find peace'
      })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          handle: 'angry aardvark',
          body: 'maybe one day we will find peace',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
