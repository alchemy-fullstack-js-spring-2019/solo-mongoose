const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app.js');
const TweetSchema = require('../lib/models/tweetSchema.js');
const UserSchema = require('../lib/models/userSchema.js');


describe('tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/Tweets', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  it('can create a new tweet', () => {
    //so request(app) is saying request express with supertest?
    return request(app)
      .post('/tweets')
      .send({
        handle: 'intro_mode',
        body: 'making a tweet!!'
      })
      //how to know when we get a res vs a createdTweet???
      //ITS RESPONSE BECAUSE WE HAVE OUR ROUTES DESIGNED TO SEND A RESPONSE WITH THE CREATED TWEET!!
      .then(res => {
        expect(res.body).toEqual({
          handle: 'intro_mode',
          body: 'making a tweet!!',
          _id: expect.any(String),
          //is _v the schema version??
          __v: 0
        });
      });
  });
  it('finds and returns a list of all tweets in the database', () => {
    return TweetSchema
      .create({
        handle: 'intro_mode',
        body: 'tweet beep'
      })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  it('finds by id', () => {
    //how would we get this to work with .create?
    //see user section for .create version
    return request(app)
      .post('/tweets')
      .send({
        handle: 'intro_mode',
        body: 'tweeetaleeet'
      })
      .then(res => {
        return request(app)
          //how does this still work with the use of a database?
          .get(`/tweets/${res.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'intro_mode',
          body: 'tweeetaleeet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('finds by ID and updates', () => {
    return TweetSchema
      .create({
        handle: 'intro_mode',
        body: 'tweetaleet'
      })
      .then(createdTweet => {
        return request(app)
          .put(`/tweets/${createdTweet._id}`) //just like post. were telling it where to post and where to put! Put completely replaces the old object. 
          .send({
            handle: 'intro_mode',
            body: 'TWEETALEET2'
          });
      })
      //why dont we put this .then under the .send??
      .then(res => {
        expect(res.body).toEqual({
          handle: 'intro_mode',
          body: 'TWEETALEET2',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

describe('user routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/Tweets', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });
  afterAll(() => {
    return mongoose.connected.close();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  it('creates a user', () => {
    return request(app)
      .post('/users')
      .send({
        handle: 'intro_mode',
        email: 'intro_mode@gmail.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'intro_mode',
          email: 'intro_mode@gmail.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('returns an array of all users in the db', () => {
    return UserSchema
      .create({
        handle: 'intro_mode',
        email: 'intro_mode@gmail.com'
      })
      //do we not HAVE to catch the res from create?
      .then(() => {
        return request(app)
          .get('/users');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  it('finds by ID', () => {
    return UserSchema
      .create({
        handle: 'intro_mode',
        email: 'intro_mode@gmail.com'
      })
      //we didn't code .create in routes, so we dont have a res. we also then dont have a .body. it is built in and just returns the created user. res goes through the full cycle of server client request, so it picks up the req res full object with headers etc. .create just returns the created user, so no body.
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'intro_mode',
          email: 'intro_mode@gmail.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  // it('finds by ID and updates', () => {
  //   return UserSchema
  //     .create({
  //       handle: 'intro_mode',
  //       email: 'intro_mode@gmail.com'
  //     })
  //     .then(createdUser => {
  //       return request(app)
  //         .post('/tweets')
  //         .send({
  //           handle: createdUser._id,
  //           body: 'heyyy'
  //         });
  //     })
  //     .then(createdTweet => {
  //       return request(app)
  //         .get(`/tweets/${createdTweet._id}`)
  //         .then(res => {
  //           expect(res.body).toEqual({
  //             handle: 'intro_mode',
  //             body: 'heyyy',
  //             _id: expect.any(String),
  //             __v: 0
  //           });
  //         });
  //     });

  // });
});





