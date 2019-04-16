const request = require('supertest');
const mongoose = require('mongoose');
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
      .send({
        handle: 'cara',
        text: 'tweets have text'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cara',
          text: 'tweets have text',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all the tweets', () => {
    return Tweet
      .create({ handle: 'cara', text: 'I am a tweet' })
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
      .create({ handle: 'cara', text: 'here is some text' })
      .then(newTweet => {
        return request(app)
          .get(`/tweets/${newTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'cara', 
          text: 'here is some text', 
          _id: expect.any(String),
          __v: 0 
        });
      });
  });
});
