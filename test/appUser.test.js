const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const User = require('../lib/models/User.js');

describe('app routes properly', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/users-test', {
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
      .post('/users')
      .send({ handle: 'Tester', name:'Tester name', email: 'test@test.com' })
      .then(created => {
        expect(created.body).toEqual({
          handle: 'Tester',
          name: 'Tester name',
          email: 'test@test.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('finds all', () => {
    return request(app)
      .post('/users')
      .send({ handle: 'Tester2', name:'Tester name2', email: 'test@test.com' })
      .then(() => {
        return request(app)
          .get('/users');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('finds by id', () => {
    return User
      .create({ handle: 'Tester3', name:'Tester name3', email: 'test@test.com' })
      .then(created => {
        return request(app)
          .get(`/users/${created.id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tester3',
          name:'Tester name3',
          email: 'test@test.com',
          _id: expect.any(String)
        });
      });

  });

  it('updates with patch', () => {
    return User
      .create({ handle: 'Tester3', name:'Tester name3', email: 'test@test.com' })
      .then(created => {
        return request(app)
          .patch(`/users/${created.id}`)
          .send({ handle: 'Updated', name: 'UpdatedName', email: 'test@test.com' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Updated',
          name: 'UpdatedName',
          email: 'test@test.com',
          _id: expect.any(String)
        });
      });
  });

  it('deletes by ID', () => {
    return User
      .create({ handle: 'Tester4', name:'Tester name4', email: 'test@test.com' })
      .then(created => {
        return request(app)
          .delete(`/users/${created.id}`);
      })
      .then(returned => {
        expect(returned.body).toEqual({ deleted: 1 });
      });
  });
});