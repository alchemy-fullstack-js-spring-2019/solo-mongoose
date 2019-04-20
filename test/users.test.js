const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('app routing test', () => {
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

  it('creates a user', () => {
    return request(app)
      .post('/users')
      .send({
        handle: '2buckchuck',
        name: 'Charlie Brown',
        email: 'charlie@brown.com'
      })
      .then(result => {
        expect(result.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          handle: '2buckchuck',
          name: 'Charlie Brown',
          email: 'charlie@brown.com'
        });
      });
  });

  it('finds all users', () => {
    return User
      .create({
        handle: '2buckchuck',
        name: 'Charlie Brown',
        email: 'charlie@brown.com'
      })
      .then(() => {
        return request(app)
          .get('/users');
      })
      .then(results => {
        expect(results.body).toHaveLength(1);
      });
  });

  it('finds a specific user by id', () => {
    return User
      .create({         
        handle: '2buckchuck',
        name: 'Charlie Brown',
        email: 'charlie@brown.com'
      })
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(returnedUser => {
        expect(returnedUser.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          handle: '2buckchuck',
          name: 'Charlie Brown',
          email: 'charlie@brown.com'
        });
      });
  });

  it('updates a user by id', () => {
    return User
      .create({
        handle: '2buckchuck',
        name: 'Charlie Brown',
        email: 'charlie@brown.com'
      })
      .then(createdUser => {
        return request(app)
          .patch(`/users/${createdUser._id}`)
          .send({
            handle: '3buckchuck',
            name: 'Charles Brown',
          });
      })
      .then(updatedUser => {
        expect(updatedUser.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          handle: '3buckchuck',
          name: 'Charles Brown',
          email: 'charlie@brown.com'
        });
      });
  });

  it('deletes a user by id', () => {
    return User
      .create({
        handle: '3buckchuck',
        name: 'Charles Brown',
        email: 'charlesbrown@aol.com'
      })
      .then(createdUser => {
        return request(app)
          .delete(`/users/${createdUser._id}`);
      })
      .then(results => {
        expect(results.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          handle: '3buckchuck',
          name: 'Charles Brown',
          email: 'charlesbrown@aol.com'
        });
      });
  });
});
