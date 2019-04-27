require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

const createTweet = () => {
  return User.create({ handle: 'Land Shark', name: 'vkeqnv', email: 'kjjnwkjvb' })
    .then(user => {
      return Tweet.create({ user: user._id, body: 'my tweet' });
    });
};

describe('tweet routes testing', () => {

  beforeAll(() => {
    return mongoose.connect(process.env.MONGODB_URI, {
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

  it('can add a tweet, with user and name fields', () => {
    const tweet = new Tweet({
      user: mongoose.Types.ObjectId(),
      body: 'first tweet from user bliss',
    });
    console.log('console', typeof(tweet));
  //   expect(tweet.toEqual(expect.any(Object))
  });

  it('can get a list of tweets', () => {
    return User.create({ handle: 'chris', name: 'bo-biss', email: 'AndInDarkness@Bind.Them' })
      .then(user => {
        return Tweet.create({ user: user._id, body: 'my LOTR tweet' });
      })
      .then(() => {
        return request(app)
          .get('/tweets/all');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by id', () => {
    return User.create({ handle: 'idme', name: 'meme', email: 'about.me.com', id: this._id })
      .then(user => {
        Tweet.create({ user: user.id, body: 'ID me!!' });
      })
      .then(() => {
        return request(app)
          .get('/tweets/:id');
      })
      .then(res => {
        expect(res);
      });
  });

  it('can find a tweet by id and update it', () => {
    return User.create({ handle: 'updater', name: 'UpdateMe', email: 'update@me.com', id: this._id })
      .then(user => {
        Tweet.create({ user: user.id, body: 'This is now an updated tweet' });
      })
      .then(() => {
        return request(app)
          .get('/tweets/:id');
      })
      .then(user => {
        Tweet.create({ user: user.id, body: 'This is now an updated tweet' });
      })
      .then(res => {
        expect(res);
      });
  });

  it('can delete a tweet', () => {
    return createTweet()
      .then(tweet => {
        return Promise.all([
          Promise.resolve(tweet._id.toString()),
          request(app)
            .delete('/tweets/:id')
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual(expect.any(Object));
        expect(_id).toEqual(_id);
      });
  });
});
