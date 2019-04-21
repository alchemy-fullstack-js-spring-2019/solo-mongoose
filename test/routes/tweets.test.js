const mongoose = require('mongoose');
const request = require('supertest');
const Tweet = require('../../lib/models/Tweet');
const app = require('../../lib/app');

describe('Tweet router tests', () => {
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

  afterAll(() =>{
    return mongoose.connection.close();
  });
  it('creates a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'cosmo',
        body: 'this is a tweet I am testing'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cosmo',
          body: 'this is a tweet I am testing',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('gets a list of all tweets', () => {
    return Tweet
      .create({
        handle: 'cosmo',
        body: 'I am testing a tweet'
      })
      .then(() => {
        return request(app)
          .get('/tweets')
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });

  it('gets a tweet by id', () => {
    return Tweet
      .create({
        handle: 'cosmo',
        body: 'I am creating a tweet to get by id'
      })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`)
          .then(res => {
            expect(res.body).toEqual({
              handle: 'cosmo',
              body: 'I am creating a tweet to get by id',
              _id: expect.any(String),
            });
          });
      });
  });

  it('finds a tweet by id and patches', () => {
    return Tweet
      .create({
        handle: 'cosmo',
        body: 'I am creating a tweet to update by id'
      })
      .then(createdTweet => {
        return request(app)
          .patch(`/tweets/${createdTweet._id}`)
          .send({ body: 'this is my updated body' })
          .then(res => {
            expect(res.body).toEqual({
              handle: 'cosmo',
              body: 'this is my updated body',
              _id: expect.any(String),
            });
          });
      });
  }); 

  it('finds a tweet by id and deletes it', () => {
    return Tweet
      .create({
        handle: 'cosmo',
        body: 'tweet to be deleted',
      })
      .then(createdTweet => {
        return Promise.all([
          Promise.resolve(createdTweet._id.toString()),
          request(app)
            .delete(`/tweets/${createdTweet._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({ _id });
      });
  });
});
