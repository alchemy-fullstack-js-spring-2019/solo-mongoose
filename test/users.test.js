const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('user routes', () => {
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

  it('can create a new user', () => {
    return request(app)
      .post('/users')
      .send({ handle: 'user1', name: 'name', email: 'name@email.com' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'user1',
          name: 'name',
          email: 'name@email.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

});
