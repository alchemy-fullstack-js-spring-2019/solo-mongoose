const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

describe('tweet routes', () => {
  
  const createTweet = () => {
    return User.create({ 
      name: 'the pickle', 
      description: 'fuzzy pickle',
      color: 'green',
      condition: 'squeaker in critical condition'   
    })
      .then(user => {
        return Tweet.create({
          user: user._id, body: 'a fine day for a tweet'
        });
      });
  };
  
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
    return User.create({
      name: 'the pickle', 
      description: 'fuzzy pickle',
      color: 'green',
      condition: 'squeaker in critical condition'
    }) 
      .then(user => {
        return request(app)
          .post('/tweets')
          .send({ user: user._id, body: 'a fine tweet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          body: 'a fine tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of all tweets', () => {
    return createTweet()
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  
  it('can get a tweet by id', () => {
    return createTweet ()
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            name: 'the pickle',
            _id: expect.any(String)
          },
          _id: expect.any(String),
          body: 'a fine day for a tweet'
        });
      });
  }); 

  it.only('can patch a tweet by id', () => {
    return createTweet()
      .then(createdTweet => {
        return request(app)
          .patch(`/tweets/${createdTweet._id}`)
          .send({ body: 'stay away from me!' });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: {
            _id: expect.any(String),
            name: 'the pickle'
          },
          body: 'stay away from me!',
        });
      });
  });

  it('can delete a tweet by id', () => {
    return Tweet
      .create({ name: 'dan', body: 'I love data!' })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({  
          name: 'dan', 
          body: 'I love data!',
          _id: expect.any(String)
        });
      });
  });

  it('can create a new user', () => {
    return request(app)
      .post('/users')
      .send({
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'green',
        condition: 'squeaker in critical condition'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'the pickle', 
          description: 'fuzzy pickle',
          color: 'green',
          condition: 'squeaker in critical condition',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of users', () => {
    return User
      .create({ 
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'green',
        condition: 'squeaker in critical condition'
      })
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
      .create({
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'green',
        condition: 'squeaker in critical condition'
      })
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'the pickle', 
          description: 'fuzzy pickle',
          color: 'green',
          condition: 'squeaker in critical condition',
          _id: expect.any(String)
        });
      });
  });

  it('can update a user', () => {
    return User
      .create({
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'purple',
        condition: 'squeaker in critical condition'
      })
      .then(createdUser => {
        return request(app)
          .put(`/users/${createdUser._id}`)
          .send({
            name: 'the pickle', 
            description: 'fuzzy pickle',
            color: 'green',
            condition: 'squeaker in critical condition'
          })
          .then(res => {
            expect(res.body).toEqual({
              name: 'the pickle', 
              description: 'fuzzy pickle',
              color: 'green',
              condition: 'squeaker in critical condition',
              _id: expect.any(String)
            });
          });
      });
  });

  it('can delete a user by id', () => {
    return User 
      .create({ 
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'green',
        condition: 'squeaker in critical condition'
      })
      .then(createdUser => {
        return request(app)
          .delete(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'the pickle', 
          description: 'fuzzy pickle',
          color: 'green',
          condition: 'squeaker in critical condition',
          _id: expect.any(String)
        });
      });
  });
});
