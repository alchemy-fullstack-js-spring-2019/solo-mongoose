const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Users = require('../lib/models/Users');

describe('user routes', () => {
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

  it('can create a new user', () => {
    return request(app)
      .post('/users')
      .send({ handle: 'user1', name: 'name', email: 'name@email.com' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'user1',
          name: 'name',
          email: 'name@email.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can find all users', () => {
    return Users
      .create({ handle: 'user1', name: 'name', email:'name@email.com' })
      .then(() => {
        return request(app)
          .get('/users');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  it('find a specific user by id', () => {
    return Users
      .create({ handle: 'user1', name: 'name', email: 'name@email.com' })
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(returnedUser => {
        expect(returnedUser.body).toEqual({
          handle: 'user1',
          name: 'name',
          email: 'name@email.com',
          _id: expect.any(String)
        });
      });
  });
  it('updates a user by id', () => {
    return Users
      .create({ handle: 'user1', name: 'name', email: 'name@email.com' })
      .then(createdUser => {
        return request(app)
          .patch(`/users/${createdUser._id}`)
          .send({ handle: 'user1', name: 'name', email: 'name@email.com' });
      })
      .then(returnedUser => {
        expect(returnedUser.body).toEqual({
          handle: 'user1',
          name: 'name',
          email: 'name@email.com',
          _id: expect.any(String)
        });
      });
  });
  it('deletes a user by id', () => {
    return Users
      .create({ handle: 'user1', name: 'name', email:'name@email.com' })
      .then(createdUser => {
        return request(app)
          .delete(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'user1',
          name: 'name',
          email: 'name@email.com',
          _id: expect.any(String)
        });
      });
  });

});
