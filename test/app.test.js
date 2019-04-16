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
    return request(app)
      .post('/tweets')
      .send({
        handle: 'stickybuns',
        body: 'i love icing!'
      })
      .then(result => {
        expect(result.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          handle: 'stickybuns',
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
        console.log(results.body.length);
        expect(results.body).toHaveLength(1);
      });
  });

});
