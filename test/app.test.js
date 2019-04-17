const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('app routing test', () => {
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

  it('creates a tweet', () => {
    const id = new mongoose.Types.ObjectId;

    return request(app)
      .post('/tweets')
      .send({
        handle: id,
        body: 'i love icing!'
      })
      .then(result => {
        expect(result.body).toEqual({
          _id: expect.any(mongoose.Types.ObjectId),
          __v: 0,
          handle: id,
          body: 'i love icing!'
        });
      });
  });

  it('finds all tweets', () => {
    return Tweet
      .create({ handle: 'sharleen', body: 'oh boy' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(results => {
        expect(results.body).toHaveLength(1);
      });
  });

  it('finds a specific tweet by id', () => {
    return Tweet
      .create({ handle: 'spencer', body: 'i\'m not real' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(returnedTweet => {
        expect(returnedTweet.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          handle: 'spencer',
          body: 'i\'m not real'
        });
      });
  });

  it('updates a tweet by id', () => {
    return Tweet
      .create({ handle: 'tiny', body: 'i want a smmich' })
      .then(createdTweet => {
        return request(app)
          .patch(`/tweets/${createdTweet._id}`)
          .send({
            body: 'i want a sammich'
          });
      })
      .then(updatedTweet => {
        expect(updatedTweet.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          handle: 'tiny',
          body: 'i want a sammich'
        });
      });
  });

  it('deletes a tweet by id', () => {
    return Tweet
      .create({ handle: 'slick', body: 'catch me if you can!' })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(results => {
        expect(results.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          handle: 'slick',
          body: 'catch me if you can!'
        });
      });
  });

});
