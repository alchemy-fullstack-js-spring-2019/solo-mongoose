require('dotenv');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app.js');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

describe('tweet routes testing', () => {
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

  it('can add a tweet', () => {
    return User.create({ handle: 'chris', name: 'bo-biss', email: 'AndInDarkness@Bind.Them' })
      .then(user => {
        return request(app)
          .post('/tweets')
          .send({ user: user._id, body: 'my LOTR tweet' });
      })
      .then(res => {
        expect(res.body).toEqual({ user: expect.any(String), body: 'my LOTR tweet', _id: expect.any(String), __v: 0 });
      });
  });

  it('can get a list of tweets, each returning only the body and user id', () => {
    return User.create({ handle: 'chris', name: 'bo-biss', email: 'AndInDarkness@Bind.Them' })
      .then(user => {
        return Tweet.create({ user: user._id, body: 'my LOTR tweet' });
      })
      .then(() => {
        return request(app)
          .get('/tweets/all');
      })
      .then(res => {
        expect(res.body).toEqual([{ body: 'my LOTR tweet', user: expect.any(String) }]);
      });
  });

  it('can get a tweet by id, returning only the body, tweet id, email, handle, and name', () => {
    return User.create({ handle: 'idme', name: 'meme', email: 'about.me.com' }) //, id: this._id })
      .then(user => {
        return Tweet.create({ user: user._id, body: 'ID me!!' });
      })
      .then(tweet => {
        return request(app)
          .get(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual(({ body: 'ID me!!', user: { _id: expect.any(String), email: 'about.me.com', handle: 'idme', name: 'meme' } }));
      });
  });

  it('can find a tweet by id and update it, returning only the body, handle, name, email and user id', () => {
    return User.create({ handle: 'updater', name: 'UpdateMe', email: 'update@me.com' })
      .then(user => {
        return Tweet.create({ user: user._id, body: 'The original tweet' });
      })
      .then(tweet => {
        return request(app)
          .patch(`/tweets/${tweet._id}`)
          .send({ body: 'This is now an updated tweet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: { _id: expect.any(String), handle: 'updater', name: 'UpdateMe', email: 'update@me.com' },
          body: 'This is now an updated tweet'

        });
      });
  });

  it('can delete a tweet, returning only the deleted body, handle, name, email, and user id', () => {
    return User.create({ handle: 'Pizza Delivery', name: 'Land Shark', email: 'Telegram' })
      .then(user => {
        return Tweet.create({ user: user._id, body: 'this is my tweet' });
      })
      .then(tweet => {
        return request(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          user: { handle: 'Pizza Delivery', name: 'Land Shark', email: 'Telegram', _id: expect.anything()  }, 
          body: 'this is my tweet',
        });
      });
  });
});

describe('user routes testing', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/users', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a user', () => {
    return request(app)
      .post('/users')
      .send({ handle: '@anna', name: 'Anna', email: 'email@email.com' })
      .then(res => {
        expect(res.body).toEqual({ handle: '@anna', name: 'Anna', email: 'email@email.com', _id: expect.any(String), __v: 0 });
      });
  });
});
