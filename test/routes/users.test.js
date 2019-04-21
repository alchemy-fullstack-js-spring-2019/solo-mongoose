const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../../lib/models/User');
const app = require('../../lib/app');

describe('User router tests', () => {
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

  afterAll(() =>{
    return mongoose.connection.close();
  });
  
  it('can create a user', () => {
    return request(app)
      .post('/users')
      .send({
        handle: 'cosmo',
        image: 'test'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cosmo',
          image: 'test',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can return a list of users', () => {
    return User
      .create({
        handle: 'cosmo',
        image: 'test 1'
      })
      .then(() => {
        return request(app)
          .get('/users')
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });

  it('can get a user by id', () => {
    return User
      .create({
        handle: 'cosmo',
        image: 'testing'
      })
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`)
          .then(res => {
            expect(res.body).toEqual({
              handle: 'cosmo',
              image: 'testing',
              _id: expect.any(String)
            });
          });
      });
  });

  it('can update a users handle', () => {
    return User
      .create({
        handle: 'cosmo',
        image: 'testing'
      })
      .then(createdUser => {
        return Promise.all([
          Promise.resolve(createdUser),
          request(app)
            .patch(`/users/${createdUser._id}`)
            .send({ handle: 'other cosmo' })
        ]);
      })
      .then(([createdUser, res]) => {
        expect(res.body).toEqual({
          handle: 'other cosmo',
          image: createdUser.image,
          _id: createdUser._id.toString(),
          __v: 0
        });
      });
  });

  it('can update a users image url', () => {
    return User
      .create({
        handle: 'cosmo',
        image: 'image'
      })
      .then(createdUser => {
        return Promise.all([
          Promise.resolve(createdUser),
          request(app)
            .patch(`/users/${createdUser._id}`)
            .send({ image: 'other image' })
        ]);
      })
      .then(([createdUser, res]) => {
        expect(res.body).toEqual({
          handle: createdUser.handle,
          image: 'other image',
          _id: createdUser._id.toString(),
          __v: 0
        });
      });
  });
});
