const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

describe('app routing test', () => {
  const createTweet = () => {
    return User.create({
      handle: 'figgypuddingpop',
      name: 'Samantha Whetsworth',
      email: 'chickletqueen@yahoo.com'
    })
      .then(user => {
        return Tweet.create({ user: user._id, body: 'a spicy tweet' });
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

  it('creates a tweet,', () => {
    return User
      .create({ handle: 'spicytunafan', name: 'Willis McGillis', email: 'spicytunes@gmail.com' })
      .then(user => {
        return request(app)
          .post('/tweets')
          .send({ user: user._id, body: 'how bout this spicy tweet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          body: 'how bout this spicy tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('finds all tweets', () => {
    return createTweet()
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(tweets => {
        expect(tweets.body).toHaveLength(1);
      });
  });

  it('finds a tweet by id', () => {
    return createTweet()
      .then(tweet => {
        return request(app)
          .get(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            handle: 'figgypuddingpop',
            name: 'Samantha Whetsworth',
            email: 'chickletqueen@yahoo.com',
            _id: expect.any(String)
          },
          body: 'a spicy tweet',
          _id: expect.any(String),
        });
      });
  });

  it('updates a tweet by id', () => {
    return createTweet() 
      .then(tweet => {
        return request(app)
          .patch(`/tweets/${tweet._id}`)
          .send({ body: 'a juicy tweet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            handle: 'figgypuddingpop',
            name: 'Samantha Whetsworth',
            email: 'chickletqueen@yahoo.com',
            _id: expect.any(String)
          },
          body: 'a juicy tweet',
          _id: expect.any(String),
        });
      });   
  });

  it('deletes a tweet by id', () => {
    return createTweet()
      .then(tweet => {
        return Promise.all([
          Promise.resolve(tweet._id.toString()),
          request(app)
            .delete(`/tweets/${tweet._id}`)
        ]);
      })
      .then(([id, res]) => {
        expect(res.body._id).toEqual(id);
      });
  });

});

