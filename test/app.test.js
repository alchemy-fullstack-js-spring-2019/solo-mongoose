require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

describe('tweet routes', () => {
  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true
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
        handle: 'bonnie',
        body: 'my first tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'bonnie',
          body: 'my first tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all tweets', () => {
    return Tweet
      .create({ handle: 'bonnie', body: 'tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by id', () => {
    return Tweet
      .create({ handle: 'barry', body: 'meow' })
      .then(createdTweet => createdTweet._id)
      .then(id => {
        return request(app)
          .get(`/tweets/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'barry',
          body: 'meow',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can update an existing tweet', () => {
    return Tweet
      .create({ handle: 'barry', body: 'meow' })
      .then(createdTweet => createdTweet._id)
      .then(id => {
        return request(app)
          .patch(`/tweets/${id}`)
          .send({
            body: 'meow meow!'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'barry',
          body: 'meow meow!',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('deletes a tweet', () => {
    return Tweet
      .create({ handle: 'deleter', body: 'doesn\'t matter cause we\'ll delete it immediately' })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`)
          .then(res => {
            expect(res.body._id).toEqual(createdTweet._id.toString());
          });
      });
  });

});

describe('User routes', () => {
  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI, {
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

  it('can create a new user', () => {
    return request(app)
      .post('/users')
      .send({
        handle: 'mcnadams',
        name: 'Bonnie McNeil',
        email: 'a@b.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'mcnadams',
          name: 'Bonnie McNeil',
          email: 'a@b.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all users', () => {
    const users = [
      {
        handle: 'mcnadams',
        name: 'Bonnie McNeil',
        email: 'a@b.com'
      },
      {
        handle: 'mcnadams1',
        name: 'Bonnie Adams',
        email: 'c@b.com'
      }
    ];
    return Promise.all(
      users.map(user => {
        return User.create(user);
      }))
      .then(() => {
        return request(app)
          .get('/users');
      })
      .then(res => {
        expect(res.body).toHaveLength(2);
      });
  });

  it('can get a user by id', () => {
    return User.create({
      handle: 'mcnadams',
      name: 'Bonnie McNeil',
      email: 'a@b.com'
    })
      .then(newUser => newUser._id)
      .then(id => {
        return request(app)
          .get(`/users/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'mcnadams',
          name: 'Bonnie McNeil',
          email: 'a@b.com',
          _id: expect.any(String)
        });
      });
  });

  it('can update an existing user email', () => {
    return User.create({
      handle: 'mcnadams',
      name: 'Bonnie McNeil',
      email: 'a@b.com'
    })
      .then(newUser => newUser._id)
      .then(id => {
        return request(app)
          .patch(`/users/${id}`)
          .send({
            email: 'b@c.com' 
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'mcnadams',
          name: 'Bonnie McNeil',
          email: 'b@c.com',
          _id: expect.any(String)
        });
      });
  });


  it('can delete a user', () => {
    return User.create({
      handle: 'mcnadams',
      name: 'Bonnie McNeil',
      email: 'a@b.com'
    })
      .then(user => user._id)
      .then(id => {
        return request(app)
          .delete(`/users/${id}`)
          .then(res => {
            expect(res.body._id).toEqual(id.toString());
          });       
      });
  });

});
