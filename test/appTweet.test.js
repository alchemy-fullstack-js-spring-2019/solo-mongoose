const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet.js');
const User = require('../lib/models/User.js');

describe('app routes properly', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tweets-test', {
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

  it('routes for POST to create', () => {
    return User.create({ handle: 'SMN', name:'Sean', email:'sean@test.com' })
      .then(user => {
        return request(app)
          .post('/tweets')
          .send({ user: user._id, text: 'posted text' });
      })
      .then(created => { 
        expect(created.body).toEqual({
          user: expect.any(String),
          text: 'posted text',
          _id: expect.any(String),
          __v: 0
        });

      });
  });

  it('finds all', () => {
    return User
      .create({ handle: 'SMN2', name:'Sean2', email:'sean2@test.com' })
      .then(user => {
        return Tweet
          .create({ user: user._id, text: 'dude' });
      })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(result => {
        expect(result.body).toHaveLength(1);
      });
  });

  it('finds by id', () => {
    return User
      .create({ handle: 'SMN3', name:'Sean3', email:'sean3@test.com' })
      .then(createdUser => {
        return Tweet
          .create({ user: createdUser._id, text:'Tester text3' })
          .then(created => {
            return request(app)
              .get(`/tweets/${created.id}`);
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                handle: 'SMN3',
                name:'Sean3',
                _id: expect.any(String),
                email:'sean3@test.com' },
              text: 'Tester text3',
              _id: expect.any(String)
            });
          });
      });
  });

  it('updates with patch', () => {

    return User
      .create({ handle: 'SMN6', name:'Sean6', email:'sean6@test.com' })
      .then(user => {
        return Tweet
          .create({ user: user._id, text:'Text to Delete' });
      })
      .then(created => {
        return request(app)
          .patch(`/tweets/${created.id}`)
          .send({ text: 'UpdatedText' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          text: 'UpdatedText',
          _id: expect.any(String)
        });
      });
  });

  it('deletes by ID', () => {
    return User
      .create({ handle: 'SMN6', name:'Sean6', email:'sean6@test.com' })
      .then(user => {
        return Tweet
          .create({ user: user._id, text:'Text to Delete' });
      })
      .then(created => {
        return request(app)
          .delete(`/tweets/${created.id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});

