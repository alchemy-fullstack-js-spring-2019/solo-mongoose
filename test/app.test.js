const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const Users = require('../lib/models/Users');

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
      .send({ handle: 'laura', body: 'my tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'laura',
          body: 'my tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can find all tweets', () => {
    return Tweet
      .create({ handle: 'laura', body: 'my tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  it('find a specific tweet by id', () => {
    return Tweet
      .create({ handle: 'laura', body: 'my tweet' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(returnedTweet => {
        expect(returnedTweet.body).toEqual({
          handle: 'laura',
          body: 'my tweet',
          _id: expect.any(String),
        });
      });
  });
  it('updates a tweet by id', () => {
    return Tweet
      .create({ handle: 'user2', body: 'textytext' })
      .then(createdTweet => {
        return request(app)
          .put(`/tweets/${createdTweet._id}`)
          .send({ handle: 'user2', body: 'textytext' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'user2',
          body: 'textytext',
          _id: expect.any(String),
        });
      });
  });
  it('deletes an tweet by id', () => {
    return Tweet
      .create({ handle: 'user2', body: 'textytext' })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'user2',
          body: 'textytext',
          _id: expect.any(String),
        });
      });
  });
});
