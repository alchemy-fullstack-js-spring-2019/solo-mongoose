const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/Users');

describe('tweet routes', () => {
  const createTweet = () => {
    return User.create({ handle: 'laura' })
      .then(user => {
        return Tweet.create({ user: user._id, body: 'my tweet' });
      });
  };

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
    return User.create({ handle: 'laura' })
      .then(user => {
        return request(app)
          .post('/tweets')
          .send({ user: user._id, body: 'my first tweet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          body: 'my first tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can find all tweets', () => {
    return createTweet()
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
    return createTweet()
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(returnedTweet => {
        expect(returnedTweet.body).toEqual({
          user: {
            handle: 'laura',
            _id: expect.any(String)
          },
          _id: expect.any(String),
          body: 'my first tweet'
        });
      });
  });
  it('updates a tweet by id', () => {
    return createTweet()
      .then(createdTweet => {
        return request(app)
          .patch(`/tweets/${createdTweet._id}`)
          .send({ body: 'textytext' });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: {
            _id: expect.any(String),
            handle: 'laura'
          },
          body: 'textytext'
        });
      });
  });
  it('deletes an tweet by id', () => {
    return createTweet()
      .then(createdTweet => {
        return Promise.all([
          Promise.resolve(createdTweet._id.toString()),
          request(app)
            .delete(`/tweets/${createdTweet._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          _id
        });
      });
  });
});
