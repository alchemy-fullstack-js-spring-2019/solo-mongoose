const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tweets', {
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

  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'megs', body: 'tweets are the best' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'megs',
          body: 'tweets are the best',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can get a list of all tweets', () => {
    return Tweet
      .create({ handle: 'meggo', body: 'gee I love to tweet' })
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
      .create({ handle: 'ollie', body: 'I am the best tweeter' })
      .then((createdTweet) => {
        return request(app)
          .get(`/tweets/${createdTweet.id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ollie',
          body: 'I am the best tweeter',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
