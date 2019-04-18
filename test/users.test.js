const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('user routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/users', {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true
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
      .send({ handle: 'dave', email: 'dcornelius@gmail.com' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'dave',
          email: 'dcornelius@gmail.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of users', () => {
    return User
      .create({ handle: 'dave', email: 'dcornelius@gmail.com' })
      .then(() => {
        return request(app)
          .get('/users');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a user by id', () => {
    return User
      .create({ handle: 'dave', email: 'dcornelius@gmail.com' })
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'dave',
          email: 'dcornelius@gmail.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('updates a user by the id', () => {
    return User
      .create({ handle: 'dave', email: 'dcornelius@gmail.com' })
      .then(user => {
        return request(app)
          .put(`/users/${user._id}`)
          .send({
            handle: 'dave',
            email: 'dcornelius@gmail.com'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'dave',
          email: 'dcornelius@gmail.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('deletes a user by the id', () => {
    return User
      .create({ handle: 'dave', email: 'dcornelius@gmail.com' })
      .then(user => {
        return request(app)
          .delete(`/users/${user._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
});
