const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://127.0.0.1:27017/fweet', {
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

  it('creates a new fweet', () => {
    request(app)
      .post('/fweet')
      .send({ handle: 'chris', body: 'this is a tweet' })
      .then(res => {
        expect(res).toEqual({ 
          handle: 'chris', 
          body: 'this is a tweet',
          _id: expect.any(mongoose.Types.ObjectId)
        });
      });
  });
});
