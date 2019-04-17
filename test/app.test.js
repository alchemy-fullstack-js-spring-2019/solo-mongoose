require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('/tweets routes', () => {
  beforeAll(() => {
    return mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true });
  });
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('adds tweet (w/ tags) to database with POST', () => {
    return request(app)
      .post('/tweets').send({
        handle: 'Tommy',
        body: 'Tweet 5',
        tags: ['testing', 'jest', 'supertest']
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'Tweet 5',
          tags: ['testing', 'jest', 'supertest'],
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('adds tweet (w/o tags) to database with POST', () => {
    return request(app)
      .post('/tweets').send({
        handle: 'Tommy',
        body: 'Tweet 5',
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'Tweet 5',
          tags: [],
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all the tweets in the database with GET', () => {
    return request(app)
      .post('/tweets').send({
        handle: 'Tommy',
        body: 'Tweet 6',
      })
      .then(() => request(app).get('/tweets'))
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets a tweet by id with GET', () => {
    return request(app)
      .post('/tweets').send({
        handle: 'Tommy',
        body: 'Tweet 6',
        tags: ['testing', 'jest', 'supertest']
      })
      .then(res => request(app).get(`/tweets/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'Tweet 6',
          tags: ['testing', 'jest', 'supertest'],
          _id: expect.any(String)
        });
      });
  });

  it('patches a tweet by id with PATCH', () => {
    return request(app)
      .post('/tweets').send({
        handle: 'Tommy',
        body: 'Tweet 5',
        tags: ['testing', 'supertest']
      })
      .then(res => request(app)
        .patch(`/tweets/${res.body._id}`)
        .send({
          handle: 'Tommy',
          body: 'Tweet 6',
          tags: ['jest']
        })
      )
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'Tweet 6',
          tags: ['jest'],
          _id: expect.any(String)
        });
      });
  });

  it('deletes a tweet by id with DELETE', () => {
    return request(app)
      .post('/tweets').send({
        handle: 'Tommy',
        body: 'Tweet 6',
        tags: ['testing', 'jest', 'supertest']
      })
      .then(res => request(app).delete(`/tweets/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'Tweet 6',
          tags: ['testing', 'jest', 'supertest'],
          _id: expect.any(String)
        });
      });
  });
});

describe('/users routes', () => {
  beforeAll(() => {
    return mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true });
  });
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('adds user to database with POST', () => {
    return request(app)
      .post('/users').send({
        handle: 'sup.tommy',
        name: 'Tommy Tran',
        email: 'tommytran@email.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'sup.tommy',
          name: 'Tommy Tran',
          email: 'tommytran@email.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all the users in the database with GET', () => {
    return request(app)
      .post('/users').send({
        handle: 'sup.tommy',
        name: 'Tommy Tran',
        email: 'tommytran@email.com'
      })
      .then(() => request(app).get('/users'))
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets a user by id with GET', () => {
    return request(app)
      .post('/users').send({
        handle: 'sup.tommy',
        name: 'Tommy Tran',
        email: 'tommytran@email.com'
      })
      .then(res => request(app).get(`/users/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          handle: 'sup.tommy',
          name: 'Tommy Tran',
          email: 'tommytran@email.com',
          _id: expect.any(String)
        });
      });
  });

  it('patches a user by id with PATCH', () => {
    return request(app)
      .post('/users').send({
        handle: 'sup.tomy',
        name: 'Tommy Tran',
        email: 'tommytran@email.com'
      })
      .then(res => request(app)
        .patch(`/users/${res.body._id}`)
        .send({
          handle: 'sup.tommy',
        })
      )
      .then(res => {
        expect(res.body).toEqual({
          handle: 'sup.tommy',
          name: 'Tommy Tran',
          email: 'tommytran@email.com',
          _id: expect.any(String)
        });
      });
  });

  it('deletes a user by id with DELETE', () => {
    return request(app)
      .post('/users').send({
        handle: 'sup.tommy',
        name: 'Tommy Tran',
        email: 'tommytran@email.com'
      })
      .then(res => request(app).delete(`/users/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          handle: 'sup.tommy',
          name: 'Tommy Tran',
          email: 'tommytran@email.com',
          _id: expect.any(String)
        });
      });
  });
});
