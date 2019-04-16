const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('e2e user routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27107/users', {
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

  // it('can create User', () => {
  //   return request(app)
  //     .post('/users')
  //     .send({
  //       handle: 'runner',
  //       name: 'reckless_escapism'
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         handle: 'runner',
  //         name: 'reckless_escapism'
  //       });
  //     });
  // });

});

