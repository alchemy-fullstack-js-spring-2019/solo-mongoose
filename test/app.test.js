const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

describe('app', () => {

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
        handle: 'gustof', 
        body: 'yo hey there friends' 
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'gustof', 
          body: 'yo hey there friends',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('gets list of all tweets', () => {
    return Tweet
      .create({ handle: 'victor', body: 'yooo' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets tweet by id', () => {
    return Tweet
      .create({ handle: 'steve', body: 'never seen it so good' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'steve', 
          body: 'never seen it so good',
          _id: expect.any(String),
          __v: 0 
        });
      });
  });

  it('gets by id and updates body using patch', () => {
    return Tweet
      .create({ handle: 'steve', body: 'happy monday' })
      .then(createdTweet => {
        return request(app)
          .patch(`/tweets/${createdTweet._id}`)
          .send({ body: 'pretty close enough' });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'steve', 
          body: 'pretty close enough', 
          _id: expect.any(String),
          __v: 0 
        });
      });
  });

  it('gets by id and updates handle using patch', () => {
    return Tweet
      .create({ handle: 'steve', body: 'happy monday' })
      .then(createdTweet => {
        return request(app)
          .patch(`/tweets/${createdTweet._id}`)
          .send({ handle: 'jared' });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'jared', 
          body: 'happy monday', 
          _id: expect.any(String),
          __v: 0 
        });
      });
  });

  it('gets tweet by id and deletes', () => {
    return Tweet
      .create({ handle: 'jessy', body: 'shurdu' })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'jessy',
          body: 'shurdu',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

describe('user', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/users', {
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

  it('create user', () => {
    return request(app)
      .post('/users')
      .send({
        handle: 'funcle-jerry',
        name: 'jared',
        email: 'uncleJerry@email.net'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'funcle-jerry',
          name: 'jared',
          email: 'uncleJerry@email.net',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all user', () => {
    return User
      .create({
        handle: 'funcle-jerry',
        name: 'jared',
        email: 'uncleJerry@email.net'
      })
      .then(() => {
        return request(app)
          .get('/users')
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });

  it('gets user by id', () => {
    return User
      .create({
        handle: 'ivana Kumloudly',
        name: 'skyler',
        email: 'dragDom@email.com'
      })
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ivana Kumloudly',
          name: 'skyler',
          email: 'dragDom@email.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets user by id and updates handle', () => {
    return User
      .create({
        handle: 'gia gun',
        name: 'badPerson',
        email: 'dragIdiot@email.net'
      })
      .then(createdUser => {
        return request(app)
          .patch(`/users/${createdUser._id}`)
          .send({ handle: 'alaska thunderfuck 5000' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'alaska thunderfuck 5000',
          name: 'badPerson',
          email: 'dragIdiot@email.net',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets user by id and updates email', () => {
    return User
      .create({
        handle: 'gia gun',
        name: 'badPerson',
        email: 'dragIdiot@email.net'
      })
      .then(createdUser => {
        return request(app)
          .patch(`/users/${createdUser._id}`)
          .send({ email: 'person@place.com' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'gia gun',
          name: 'badPerson',
          email: 'person@place.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

});
