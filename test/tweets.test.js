const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('e2e tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/users', {
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

  it('can create a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'angry aardvark',
        body: 'maybe one day we will find peace'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'angry aardvark',
          body: 'maybe one day we will find peace',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('return a list of tweets', () => {
    return Tweet
      .create({
        handle: 'drunken dingo',
        body: 'time is a flat circle'
      })
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
      .create({ handle: 'surely snake', body: 'the cheese has gone bad' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'surely snake',
          body: 'the cheese has gone bad',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can update a tweet by ID', () => {
    return Tweet
      .create({
        handle: 'cretinous crab',
        body: 'arrogant ass',
      })
      .then(tweet => {
        return request(app)
          .put(`/tweets/${tweet._id}`)
          .send({
            handle: 'doubt',
            body: 'regret'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'doubt',
          body: 'regret',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

});
