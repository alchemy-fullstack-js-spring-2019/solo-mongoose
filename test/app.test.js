const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {
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

  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'cara',
        text: 'tweets have text'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cara',
          text: 'tweets have text',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all the tweets', () => {
    return Tweet
      .create({ handle: 'cara', text: 'I am a tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it.only('can get a tweet by id', () => {
    User
      .create({
        handle: 'cara',
        image: 'image url'
      })
      .then(createdUser => {
        return Tweet.create({
          user: createdUser._id,
          text: 'here is some text'
        });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          user: {
            _id: expect.any(String),
            handle: 'cara',
          }, 
          text: 'here is some text', 
          _id: expect.any(String),
        });
      });
  });

  it('can find a tweet by id and update', () => {
    return Tweet
      .create({ handle: 'cara', text: 'here is some text' })
      .then(newTweet => {
        return request(app)
          .patch(`/tweets/${newTweet._id}`)
          .send({
            handle: 'cara',
            text: 'new text new text'
          });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'cara', 
          text: 'new text new text', 
          _id: expect.any(String),
          __v: 0 
        });
      });
  });

  it('can delete a tweet by id', () => {
    const aTweet = { handle: 'cara', text: 'here is some text' };
    return Tweet
      .create(aTweet)
      .then(newTweet => {
        return request(app)
          .delete(`/tweets/${newTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'cara', 
          text: 'here is some text', 
          _id: expect.any(String),
          __v: 0 
        });
      });
  });
});

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
        email: 'email.one@email.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cara_handle',
          name: 'cara',
          email: 'email.one@email.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all the users', () => {
    return User
      .create({ handle: 'cara_handler', name: 'Iam A Person', email: 'email@email.com' })
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
          _id: expect.any(String)
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
          _id: expect.any(String)
        });
      });
  });

  it('can delete a user by id', () => {
    return User
      .create({
        handle: 'sick_handle_brah',
        name: 'Shreddy McGnar',
        email: 'professional@gettingrad.com'
      })
      .then(newUser => {
        return request(app)
          .delete(`/users/${newUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'sick_handle_brah',
          name: 'Shreddy McGnar',
          email: 'professional@gettingrad.com', 
          _id: expect.any(String)
        });
      });
  });
});
