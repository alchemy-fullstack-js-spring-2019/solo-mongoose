const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');

describe('dog route', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://127.0.0.1:27017/dogs', { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterEach(() => {
    return mongoose.connection.close();
  });

  it('create a new dog', () => {
    return request(app)
      .post('/dogs')
      .send({ name: 'Trevor', age: 600 })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Trevor',
          age: 600,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('get list of dogs', () => {
    return Dog
      .create({ name: 'Trevor', age: 600 })
      .then(() => {
        return request(app)
          .get('/dogs');
      })
      .then(res => expect(res.body).toHaveLength(1));
  });
    
  it('get dog by ID', () => {
    return Dog
      .create({ name: 'Trevor', age: 600 })
      .then(createdDog => {
        return request(app)
          .get(`/dogs/${createdDog._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ name: 'Trevor', age: 600, __v: 0, _id: expect.any(String) });
      });
  });

  it('update dog by ID', () => {
    return Dog
      .create({ name: 'Trevor', age: 600 })
      .then(dog => {
        return request(app)
          .put(`/dogs/${dog._id}`)
          .send({ name: 'Ted', age: 3 });
      })
      .then(res => {
        expect(res.body).toEqual({ name: 'Ted', age: 3, __v:0, _id: expect.any(String) });
      });
  });

  it('delete by ID', () => {
    return Dog
      .create({ name: 'Trevor', age: 600 })
      .then(dog => {
        return request(app)
          .delete(`/dogs/${dog._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ name: 'Trevor', age: 600, __v: 0, _id: expect.any(String) });
      });
  });
});
