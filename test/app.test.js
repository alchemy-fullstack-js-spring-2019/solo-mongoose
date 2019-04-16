const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('app routes properly', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tweets', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('routes for POST to create', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'Tester', text:'Tester text' })
      .then(created => {
        expect(created.body).toEqual({
          handle: 'Tester',
          text: 'Tester text',
          __v: 0,
          _id: expect.any(String)
        });
      });
  });

});
