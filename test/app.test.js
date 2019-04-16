const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

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
          _id: expect.any(String),
          __v: 0
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
          _id: expect.any(String),
          __v: 0
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
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
