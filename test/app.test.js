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

  it('can find a tweet by id and update', () => {
    return Tweet
      .create({ handle: 'cara', text: 'here is some text' })
      .then(newTweet => {
        return request(app)
          .patch(`/tweets/${newTweet._id}`)
          .send({
            handle: 'cara',
            text: 'new text new text'
          });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'cara', 
          text: 'new text new text', 
          _id: expect.any(String),
          __v: 0 
        });
      });
  });

  it('can delete a tweet by id', () => {
    const aTweet = { handle: 'cara', text: 'here is some text' };
    return Tweet
      .create(aTweet)
      .then(newTweet => {
        return request(app)
          .delete(`/tweets/${newTweet._id}`);
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
