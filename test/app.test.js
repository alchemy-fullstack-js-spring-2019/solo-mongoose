const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
// const Ninja = require('../lib/models/Ninja');
require('dotenv').config();

describe('APP TESTS', () => {
  beforeAll(() => {
    return mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });
  
  it('creates a new ninja', () => {
    return request(app)
      .post('/ninjas')
      .send({ nickname: 'nino', age: 20, tagline: 'death' })
      .then(res => {
        expect(res.body).toEqual({
          nickname: 'nino', 
          age: 20, 
          tagline: 'death',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
