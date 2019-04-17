const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Fweet = require('../lib/models/Fweet');
const User = require('../lib/models/User');

describe('routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://127.0.0.1:27017/fweet', {
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

  const testUser = { handle: 'chris1', name: 'chris', email: 'test@test.com' };
  const testNewUser = new User(testUser);
  const testFweet = { handle: testNewUser._id, body: 'this is a tweet' };

  it('creates a new fweet', () => {
    return request(app)
      .post('/fweet')
      .send(testFweet)
      .then(res => {
        expect(res.body).toEqual({ 
          handle: testNewUser._id.toString(), 
          body: 'this is a tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all fweets', () => {
    return Fweet
      .create(testFweet)
      .then(() => {
        return request(app)
          .get('/fweet');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets a fweet by id', () => {
    return User
      .create(testUser)
      .then(createdUser => {
        return Fweet
          .create({
            handle: createdUser._id,
            body: 'this is a tweet'
          });
      })
      .then(createdFweet => {
        return request(app)
          .get(`/fweet/${createdFweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: {
            handle: 'chris1',
            _id: expect.any(String),
          },
          body: 'this is a tweet',
          _id: expect.any(String)
        });
      });
  
  });

  it('deletes a fweet by id', () => {
    return User
      .create(testUser)
      .then(createdUser => {
        return Fweet
          .create({
            handle: createdUser._id,
            body: 'this is a tweet'
          });
      })
      .then(createdFweet => {
        return request(app)
          .delete(`/fweet/${createdFweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: {
            handle: 'chris1',
            _id: expect.any(String),
          },
          body: 'this is a tweet',
          _id: expect.any(String)
        });
      });
  });

  it('updates the body of a fweet by id', () => {
    return User
      .create(testUser)
      .then(createdUser => {
        return Fweet
          .create({
            handle: createdUser._id,
            body: 'this is a tweet'
          });
      })
      .then(createdFweet => {
        return request(app)
          .patch(`/fweet/${createdFweet._id}`)
          .send({ body: 'this is an updated fweet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: {
            handle: 'chris1',
            _id: expect.any(String),
          },
          body: 'this is an updated fweet',
          _id: expect.any(String),
        });
      });
  });

  it('creates a new user', () => {
    return request(app)
      .post('/user')
      .send(testUser)
      .then(res => {
        expect(res.body).toEqual({
          ...testUser,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('returns a list of all users', () => {
    return User
      .create(testUser)
      .then(() => {
        return request(app)
          .get('/user');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('returns a user by id', () => {
    return User 
      .create(testUser)
      .then(createdUser => {
        return request(app)
          .get(`/user/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          ...testUser,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('updates a user\'s name by id', () => {
    return User
      .create(testUser)
      .then(createdUser => {
        return request(app)
          .patch(`/user/${createdUser._id}`)
          .send({ name: 'dave' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'chris1',
          name: 'dave',
          email: 'test@test.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('updates a user\'s email by id', () => {
    return User
      .create(testUser)
      .then(createdUser => {
        return request(app)
          .patch(`/user/${createdUser._id}`)
          .send({ email: 'new@test.com' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'chris1',
          name: 'chris',
          email: 'new@test.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('updates a user\'s email and name', () => {
    return User
      .create(testUser)
      .then(createdUser => {
        return request(app)
          .patch(`/user/${createdUser._id}`)
          .send({ name: 'john', email: 'hi@test.com' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'chris1',
          name: 'john',
          email: 'hi@test.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('deletes a user', () => {
    return User
      .create(testUser)
      .then(createdUser => {
        return request(app)
          .delete(`/user/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          ...testUser,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
