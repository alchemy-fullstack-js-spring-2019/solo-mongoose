const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

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
    User
      .create({
        handle: 'figgypuddingpop',
        name: 'Samantha Whetsworth',
        email: 'chickletqueen@yahoo.com'
      })
      .then(createdUser => {
        return Tweet
          .create({
            user: createdUser._id,
            body: 'Get all this ganache'
          })
          .then(createdTweet => {
            expect(createdTweet.body).toEqual({
              _id: expect.any(String),
              user: expect.any(mongoose.Types.ObjectId),
              body: 'Get all this ganache'
            });
          });
      });
  });

  it('finds all tweets', () => {
    User
      .create({
        handle: 'figgypuddingpop',
        name: 'Samantha Whetsworth',
        email: 'chickletqueen@yahoo.com'
      })
      .then(createdUser => {
        return Tweet
          .create({ 
            user: createdUser._id, 
            body: 'oh boy' 
          })
          .then(() => {
            return request(app)
              .get('/tweets');
          })
          .then(results => {
            expect(results.body).toHaveLength(1);
          });
      });
  });

  it('finds a specific tweet by id', () => {
    User
      .create({
        handle: 'figgypuddingpop',
        name: 'Samantha Whetsworth',
        email: 'chickletqueen@yahoo.com'
      })
      .then(createdUser => {
        return Tweet
          .create({ 
            User: createdUser._id, 
            body: 'i\'m not real' 
          })
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
  });

  it('updates a tweet by id', () => {
    User
      .create({
        handle: 'figgypuddingpop',
        name: 'Samantha Whetsworth',
        email: 'chickletqueen@yahoo.com'
      })
      .then(createdUser => {
        return Tweet
          .create({ 
            user: createdUser._id, 
            body: 'i want a smmich' })
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
  });

  it('deletes a tweet by id', () => {
    User
      .create({
        handle: 'figgypuddingpop',
        name: 'Samantha Whetsworth',
        email: 'chickletqueen@yahoo.com'
      })
      .then(createdUser => {
        return Tweet
          .create({ 
            user: createdUser._id, 
            body: 'catch me if you can!' 
          })
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
});
