require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

describe('tweet routes', () => {
  const createTweet = () => {
    return User.create({ handle: 'Bonnie' })
      .then(user => {
        return Tweet.create({
          user: user._id,
          body: 'hello world'
        });
      });
  };

  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true
    });
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new tweet', () => {
    return User.create({ handle: 'Bonnie' })
      .then(user => {
        return request(app)
          .post('/tweets')
          .send({
            user: user._id,
            body: 'asinine opinions'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          body: 'asinine opinions',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all tweets', () => {
    return createTweet()
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it.only('can get a tweet by id', () => {
    return createTweet()
      .then(tweet => {
        return request(app)
          .get(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            handle: 'Bonnie', 
            image: 'https://via.placeholder.com/250'
          },
          body: 'hello world',
          _id: expect.any(String)
        });
      });
  });

  it('can update an existing tweet', () => {
    return Tweet
      .create({ handle: 'barry', body: 'meow' })
      .then(createdTweet => createdTweet._id)
      .then(id => {
        return request(app)
          .patch(`/tweets/${id}`)
          .send({
            body: 'meow meow!'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'barry',
          body: 'meow meow!',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('deletes a tweet', () => {
    return Tweet
      .create({ handle: 'deleter', body: 'doesn\'t matter cause we\'ll delete it immediately' })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`)
          .then(res => {
            expect(res.body._id).toEqual(createdTweet._id.toString());
          });
      });
  });

});
