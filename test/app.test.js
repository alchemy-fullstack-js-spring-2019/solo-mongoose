const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('dog route', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://127.0.0.1:27017/dogs', { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
});
