require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

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
    console.log('console', typeof(tweet.toJSON()._id));
    expect(tweet.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      body: 'first tweet from user bliss',
      _id: expect.any(mongoose.Types.ObjectId)
    });
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

  it('can delete a tweet by id', () => {
    return User.create({ handle: 'byeUser', name: 'Ima Outtahere', email: 'gotta.run.dmc', _id: this._id })
      .then(user => {
        Tweet.create({ user: user.id, body: 'You should delete this user' });
      })
      .then(() => {
        return request(app)
          .get('/tweets/:id');
      })
      .then(res => {
        expect(res.body).toEqual({});
      });
  });
});
