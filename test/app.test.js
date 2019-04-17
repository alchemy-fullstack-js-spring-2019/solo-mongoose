const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app.js');
const TweetSchema = require('../lib/models/tweetSchema.js');

describe('tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/Tweets', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  it('can create a new tweet', () => {
    //why do we say request(app) here but TweetSchema below?
    //so request(app) is saying request express with supertest?
    return request(app)
      .post('/tweets')
      .send({
        handle: 'intro_mode',
        body: 'making a tweet!!'
      })
      //how to know when we get a res vs a createdTweet???
      //ITS RESPONSE BECAUSE WE HAVE OUR ROUTES DESIGNED TO SEND A RESPONSE WITH THE CREATED TWEET!!
      .then(res => {
        expect(res.body).toEqual({
          handle: 'intro_mode',
          body: 'making a tweet!!',
          _id: expect.any(String),
          //is _v the schema version??
          __v: 0
        });
      });
  });
  it('finds and returns a list of all tweets in the database', () => {
    return TweetSchema
      .create({
        handle: 'intro_mode',
        body: 'tweet beep'
      })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});
