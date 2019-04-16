const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tweets', {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true
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
      .send({ handle: 'dave', body: 'a magical tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'dave',
          body: 'a magical tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of tweets', () => {
    return Tweet
      .create({ handle: 'dave', body: 'a magical tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by id', () => {
    return Tweet
      .create({ handle: 'dave', body: 'a magical tweet' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'dave',
          body: 'a magical tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
