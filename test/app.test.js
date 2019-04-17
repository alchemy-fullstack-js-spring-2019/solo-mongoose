const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet.js');

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
    return request(app)
      .post('/tweets')
      .send({ handle: 'Tester', text:'Tester text' })
      .then(created => {
        expect(created.body).toEqual({
          handle: 'Tester',
          text: 'Tester text',
          __v: 0,
          _id: expect.any(String)
        });
      });
  });

  it('finds all', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'Tester2', text:'Tester text2' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('finds by id', () => {
    return Tweet
      .create({ handle: 'Tester3', text:'Tester text3' })
      .then(created => {
        return request(app)
          .get(`/tweets/${created.id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tester3',
          text:'Tester text3',
          __v: 0,
          _id: expect.any(String)
        });
      });

  });

  it('updates with patch', () => {
    return Tweet
      .create({ handle: 'Tester3', text:'Tester text3' })
      .then(created => {
        return request(app)
          .patch(`/tweets/${created.id}`)
          .send({ handle: 'Updated', text: 'UpdatedText' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Updated',
          text: 'UpdatedText',
          __v: 0,
          _id: expect.any(String)
        });
      });
  });

  it('deletes by ID', () => {
    return Tweet
      .create({ handle: 'Tester4', text:'Tester text4' })
      .then(created => {
        return request(app)
          .delete(`/tweets/${created.id}`);
      })
      .then(returned => {
        expect(returned.body).toEqual({ deleted: 1 });
      });
  });
});
