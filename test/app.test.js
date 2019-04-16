const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');
const User = require('../lib/models/User');

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
      .send({
        handle: 'cara_handle',
        name: 'cara',
        email: 'email@email.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cara_handle',
          name: 'cara',
          email: 'email@email.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all the users', () => {
    return User
      .create({ handle: 'cara_handler', name: 'Iam A Person', email: 'email@internets.com' })
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
      .create({ handle: 'new_handle', name: 'New Person', email: 'email@internets.com' })
      .then(newUser => {
        return request(app)
          .get(`/users/${newUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'new_handle', 
          name: 'New Person', 
          email: 'email@internets.com', 
          _id: expect.any(String),
          __v: 0 
        });
      });
  });

  it('can find a user by id and update', () => {
    return User
      .create({ handle: 'aspasp', name: 'Moses', email: 'moses@email.com' })
      .then(newUser => {
        return request(app)
          .patch(`/users/${newUser._id}`)
          .send({
            email: 'NewEmail@place.com'
          });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'aspasp', 
          name: 'Moses', 
          email: 'NewEmail@place.com', 
          _id: expect.any(String),
          __v: 0 
        });
      });
  });

  // it('can delete a tweet by id', () => {
  //   const aTweet = { handle: 'cara', text: 'here is some text' };
  //   return Tweet
  //     .create(aTweet)
  //     .then(newTweet => {
  //       return request(app)
  //         .delete(`/tweets/${newTweet._id}`);
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({ 
  //         handle: 'cara', 
  //         text: 'here is some text', 
  //         _id: expect.any(String),
  //         __v: 0 
  //       });
  //     });
  // });
});
