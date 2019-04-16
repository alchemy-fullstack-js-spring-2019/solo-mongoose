const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Fweet = require('../lib/models/Fweet');

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

  const testFweet = { handle: 'chris', body: 'this is a tweet' };

  it('creates a new fweet', () => {
    return request(app)
      .post('/fweet')
      .send(testFweet)
      .then(res => {
        // console.log(res.body)
        expect(res.body).toEqual({ 
          handle: 'chris', 
          body: 'this is a tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all fweets', () => {
    return Fweet
      .create(testFweet)
      .then(() => {
        return request(app)
          .get('/fweet');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});
