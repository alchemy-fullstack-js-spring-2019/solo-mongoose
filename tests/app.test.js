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
          .get(`/tweets/${createdTweet._id}`);
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
  it('can find a tweet by id and update', () => {
    return Tweet
      .create({ handle: 'simon', body: 'I\'m an Aussie' })
      .then((createdTweet) => {
        return request(app)
          .patch(`/tweets/${createdTweet._id}`)
          .send({
            body: 'I\'m a Kiwi'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'simon',
          body: 'I\'m a Kiwi',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('finds by id and deletes', () => {
    return Tweet
      .create({ handle: 'megan', body: 'I am serious' })
      .then((createdTweet) => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'megan',
          body: 'I am serious',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
