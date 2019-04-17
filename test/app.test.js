const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');
const User = require('../lib/models/User');

describe('dog routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/dogs', {
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

  it('can create a new dog', () => {
    return request(app)
      .post('/dogs')
      .send({
        name: 'buddy',
        age: 2,
        breed: 'mini goldendoodle'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'buddy',
          age: 2,
          breed: 'mini goldendoodle',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can find a list of dogs', () => {
    return Dog.create({
      name: 'buddy',
      age: 3,
      breed: 'mini goldendoodle'
    })
      .then(() => {
        return request(app)
          .get('/dogs');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a dog by id', () => {
    return Dog.create({
      name: 'charlie',
      age: 1,
      breed: 'golden retriever'
    })
      .then(createdDog => {
        return request(app)
          .get(`/dogs/${createdDog._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'charlie',
          age: 1,
          breed: 'golden retriever',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can update a dog by id', () => {
    return Dog.create({
      name: 'charlie',
      age: 1,
      breed: 'golden retriever'
    })
      .then(createdDog => {
        return request(app)
          .patch(`/dogs/${createdDog._id}`)
          .send({
            name: 'buddy'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'buddy',
          age: 1,
          breed: 'golden retriever',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can delete a dog by id', () => {
    return Dog.create({
      name: 'buddy',
      age: 3,
      breed: 'golden retriever'
    })
      .then(createdDog => {
        return request(app)
          .delete(`/dogs/${createdDog._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'buddy',
          age: 3,
          breed: 'golden retriever',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

describe('user routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/users', {
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
        handle: '@leslie',
        name: 'leslie',
        email: 'leslie@gmail.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: '@leslie',
          name: 'leslie',
          email: 'leslie@gmail.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
