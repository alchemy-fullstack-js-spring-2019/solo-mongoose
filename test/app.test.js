const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');
require('dotenv').config();


describe('tweets', () => {
  
  const createTweet = () => {
    return User
      .create({
        handle: 'jimmy no panys',
        name: 'jimithy',
        email: 'aintGotNoEmail.email.com'
      })
      .then(createdUser => {
        return Tweet
          .create({ user: createdUser._id, body: 'yooo' });
      });
  };

  beforeAll(() => {
    return mongoose.connect(process.env.MONGODB_URI, {
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

  it('creates a tweet', () => {
    return User
      .create({
        handle: 'jimmy no pants',
        name: 'jimithy',
        email: 'aintGotNoEmail.email.com'
      })
      .then(createdUser => {
        return request(app)
          .post('/tweets')
          .send({ 
            user: createdUser._id, 
            body: 'yo hey there friends' 
          })
          .then(res => {
            expect(res.body).toEqual({ 
              body: 'yo hey there friends',
              _id: expect.any(String),
              __v: 0,
              user: expect.any(String)
            });
          });
      });
  });

  it('creates a tweet with random quote', () => {
    return User
      .create({
        handle: 'jimmy no pants',
        name: 'jimithy',
        email: 'aintGotNoEmail.email.com'
      })
      .then(createdUser => {
        return request(app)
          .post('/tweets')
          .send({ user: createdUser._id })
          .then(res => {
            expect(res.body).toEqual({ 
              body: expect.any(String),
              _id: expect.any(String),
              __v: 0,
              user: expect.any(String)
            });
          });
      });
  });

  it('gets list of all tweets', () => {
    return createTweet()
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets tweet by id', () => {
    return createTweet()
      .then(tweet => {
        return request(app)
          .get(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          user: expect.any(String), 
          body: 'yooo',
          _id: expect.any(String)
        });
      });
  });

  it('gets by id and updates body using patch', () => {
    return createTweet()
      .then(tweet => {
        return request(app)
          .patch(`/tweets/${tweet._id}`)
          .send({ body: 'pretty close enough' });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          user: expect.any(String), 
          body: 'pretty close enough', 
          _id: expect.any(String),
        });
      });
  });

  it('gets by id and updates handle using patch', () => {
    return createTweet()
      .then(tweet =>{
        return request(app)
          .patch(`/tweets/${tweet._id}`)
          .send({ handle: 'jared' });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          user: expect.any(String), 
          body: 'yooo', 
          _id: expect.any(String),
        });
      });
  });

  it('gets tweet by id and deletes', () => {
    return createTweet()
      .then(tweet => {
        return request(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          body: 'yooo',
          _id: expect.any(String),
        });
      });
  });
});


describe('user', () => {

  beforeAll(() => {
    return mongoose.connect(process.env.MONGODB_URI, {
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

  it('create user', () => {
    return request(app)
      .post('/users')
      .send({
        handle: 'funcle-jerry',
        name: 'jared',
        email: 'uncleJerry@email.net'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'funcle-jerry',
          name: 'jared',
          email: 'uncleJerry@email.net',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all user', () => {
    return User
      .create({
        handle: 'funcle-jerry',
        name: 'jared',
        email: 'uncleJerry@email.net'
      })
      .then(() => {
        return request(app)
          .get('/users')
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });

  it('gets user by id', () => {
    return User
      .create({
        handle: 'ivana Kumloudly',
        name: 'skyler',
        email: 'dragDom@email.com'
      })
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ivana Kumloudly',
          name: 'skyler',
          email: 'dragDom@email.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets user by id and updates handle', () => {
    return User
      .create({
        handle: 'gia gun',
        name: 'badPerson',
        email: 'dragIdiot@email.net'
      })
      .then(createdUser => {
        return request(app)
          .patch(`/users/${createdUser._id}`)
          .send({ handle: 'alaska thunderfuck 5000' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'alaska thunderfuck 5000',
          name: 'badPerson',
          email: 'dragIdiot@email.net',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets user by id and updates email', () => {
    return User
      .create({
        handle: 'gia gun',
        name: 'badPerson',
        email: 'dragIdiot@email.net'
      })
      .then(createdUser => {
        return request(app)
          .patch(`/users/${createdUser._id}`)
          .send({ email: 'person@place.com' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'gia gun',
          name: 'badPerson',
          email: 'person@place.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets user by id and updates email and handle', () => {
    return User
      .create({
        handle: 'gia gun',
        name: 'badPerson',
        email: 'dragIdiot@email.net'
      })
      .then(createdUser => {
        return request(app)
          .patch(`/users/${createdUser._id}`)
          .send({ email: 'person@place.com', handle: 'whoman21' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'whoman21',
          name: 'badPerson',
          email: 'person@place.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('get user by id and deletes', () => {
    return User
      .create({
        handle: 'ivana Kumloudly',
        name: 'skyler',
        email: 'dragDom@email.com'
      })
      .then(createdUser => {
        return request(app)
          .delete(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ivana Kumloudly',
          name: 'skyler',
          email: 'dragDom@email.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

});


