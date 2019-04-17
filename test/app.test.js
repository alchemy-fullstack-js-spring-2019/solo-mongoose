const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('e2e user routes', () => {
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

  it('can create User', () => {
    return request(app)
      .post('/users')
      .send({
        handle: 'runner',
        name: 'reckless_escapism'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'runner',
          name: 'reckless_escapism',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('return a list of users', () => {
    return User
      .create({ 
        handle: 'curiouscoyote', 
        name: 'erroneous error' })
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
      .create({ handle: 'sure', name: 'optimism' })
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'sure',
          name: 'optimism',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('it can update userinfo by ID', () => {
    return User.create({ 
      handle: 'cretinous crab',
      name: 'arrogant ass',
    })
      .then(createdUser => {
        return request(app)
          .put(`/users/${createdUser._id}`)
          .send({ 
            handle: 'monstrous crab',
            name: 'directionless ennui' 
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'monstrous crab', 
          name: 'directionless ennui',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('it can delete stuff', () => {
    return User.create({ handle: 'sad_robot', name: 'empty heart' })
      .then(user => {
        return request(app)
          .delete(`/users/${user._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'sad_robot',
          name: 'empty heart',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

});
