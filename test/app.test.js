const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/Users');

describe('tweet routes', () => {
  const createTweet = () => {
    return User.create({ 
      handle: 'laurab',  
      name: 'laura',
      email: 'name@email.com'
    })
      .then(user => {
        return Tweet.create({ user: user._id, body: 'my first tweet', name: 'laura' });
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

  // const user1 = { handle: 'lab', name: 'laura', email: 'name@gmail.com' };
  // const testUser1 = new User(user1);
  // const testTweet = { user: testUser1._id, body: 'my first tweet' };

  it('can create a new tweet', () => {
    return User.create({ handle: 'laurab', name: 'laura', email: 'name@email.com' })
      .then(newUser => {
        return request(app)
          .post('/tweets')
          .send({ user: newUser._id, body: 'my first tweet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          body: 'my first tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can find all tweets', () => {
    return createTweet()
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
      
  });
  it('find a specific tweet by id', () => {
    return createTweet()
      .then(foundTweet => {
        return request(app)
          .get(`/tweets/${foundTweet._id}`);
      })
      .then(returnedTweet => {
        expect(returnedTweet.body).toEqual({
          user: {
            handle: 'laurab',
            _id: expect.any(String),
            email: 'name@email.com',
            name: 'laura'
          },
          _id: expect.any(String),
          body: 'my first tweet',
        });
      });
  });
  it.only('updates a tweet by id', () => {
    return createTweet()
      .then(createdTweet => {
        return request(app)
          .put(`/tweets/${createdTweet._id}`)
          .send({ body: 'textytext' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            handle: 'laurab',
            // email: 'name@email.com',
            // name: 'laura'
          },
          body: 'textytext',
          _id: expect.any(String)
        });
      });
  });
  it('deletes an tweet by id', () => {
    return createTweet()
      .then(createdTweet => {
        return Promise.all([
          Promise.resolve(createdTweet._id.toString()),
          request(app)
            .delete(`/tweets/${createdTweet._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          _id
        });
      });
  });
});
