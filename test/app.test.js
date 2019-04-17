const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

describe('tweet routes', ()=> {
  beforeAll(()=> {
    return mongoose.connect('mongodb://localhost:27017/tweets', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(()=> {
    return mongoose.connection.dropDatabase();
  });

  afterAll(()=> {
    return mongoose.connection.close();
  });

  it('can create a new tweet', ()=> {
    return request(app)
      .post('/tweets')
      .send({ handle: 'emily', body: 'my cool tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emily',
          body: 'my cool tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of tweets', ()=> {
    return Tweet
      .create({
        handle: 'emily',
        body: 'my cool tweet'
      })
      .then(()=> {
        return request(app)
          .get('/tweets');
      })
      .then(res => { 
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by id', ()=> {
    return Tweet
      .create({
        handle: 'emily',
        body: 'my cool tweet'
      })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emily',
          body: 'my cool tweet',
          _id: expect.any(String)
        });
      });
  });
  
  it('can update a tweet by id', ()=> {
    return Tweet
      .create({
        handle: 'emily',
        body: 'my cool tweet'
      })
      .then(createdTweet => {
        return request(app)
          .put(`/tweets/${createdTweet._id}`)
          .send({
            handle: 'emily',
            body: 'my really cool tweet'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emily',
          body: 'my really cool tweet',
          _id: expect.any(String)
        });
      });
  });
  it('can delete a tweet by id', ()=> {
    return Tweet
      .create({
        handle: 'emily',
        body: 'my cool deleted tweet'
      })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emily',
          body: 'my cool deleted tweet',
          _id: expect.any(String)
        });
      });
  });
});

describe('user routes', ()=> {
  beforeAll(()=> {
    return mongoose.connect('mongodb://localhost:27017/users', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(()=> {
    return mongoose.connection.dropDatabase();
  });

  afterAll(()=> {
    return mongoose.connection.close();
  });

  it('will create a new user', ()=> {
    return request(app)
      .post('/users')
      .send({ 
        handle: 'emilybemily', 
        name: 'emily',
        email: 'testemail@test.com' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emilybemily', 
          name: 'emily',
          email: 'testemail@test.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of users', ()=> {
    return User
      .create({ 
        handle: 'emilybemily', 
        name: 'emily',
        email: 'testemail@test.com' })
      .then(()=> {
        return request(app)
          .get('/users');
      })
      .then(res => { 
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a user by id', ()=> {
    return User
      .create({ 
        handle: 'emilybemily', 
        name: 'emily',
        email: 'testemail@test.com' })
      .then(createdUser=> {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emilybemily', 
          name: 'emily',
          email: 'testemail@test.com',
          _id: expect.any(String)
        });
      });
  });

  it('can update a user by id', ()=> {
    return User
      .create({ 
        handle: 'emilybemily', 
        name: 'emily',
        email: 'testemail@test.com' })
      .then(createdUser => {
        return request(app)
          .put(`/users/${createdUser._id}`)
          .send({
            handle: 'emilybemily1',
            name: 'emily',
            email: 'testemail@test.com'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emilybemily1',
          name: 'emily',
          email: 'testemail@test.com',
          _id: expect.any(String)
        });
      });
  });

  it('can delete a user by id', ()=> {
    return User
      .create({
        handle: 'emilybemily',
        name: 'emily',
        email: 'testemail@test.com'
      })
      .then(createdUser => {
        return request(app)
          .delete(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emilybemily',
          name: 'emily',
          email: 'testemail@test.com',
          _id: expect.any(String)
        });
      });
  });
});
