const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');

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
});
