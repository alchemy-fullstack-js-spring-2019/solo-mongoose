const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');

describe('app routing test', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/dogs', {
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

  it('creates a dog', () => {
    return request(app)
      .post('/dogs')
      .send({
        name: 'Hank',
        color: 'black',
        age: 10,
        favoriteFood: 'steakums'
      })
      .then(result => {
        expect(result.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Hank',
          color: 'black',
          age: 10,
          favoriteFood: 'steakums'
        });
      });
  });

  it('finds all dogs', () => {
    return Dog
      .create({
        name: 'Joe',
        color: 'black',
        age: 6,
        favoriteFood: 'anything'
      })
      .then(() => {
        return request(app)
          .get('/dogs');
      })
      .then(results => {
        expect(results.body).toHaveLength(1);
      });
  });

  it('finds a specific dog by id', () => {
    return Dog
      .create({         
        name: 'Hank',
        color: 'black',
        age: 10,
        favoriteFood: 'steakums' 
      })
      .then(createdDog => {
        return request(app)
          .get(`/dogs/${createdDog._id}`);
      })
      .then(returnedDog => {
        expect(returnedDog.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Hank',
          color: 'black',
          age: 10,
          favoriteFood: 'steakums' 
        });
      });
  });

  it('updates a dog by id', () => {
    return Dog
      .create({
        name: 'Hank',
        color: 'black',
        age: 10,
        favoriteFood: 'steakums' 
      })
      .then(createdDog => {
        return request(app)
          .patch(`/dogs/${createdDog._id}`)
          .send({
            name: 'Sam',
            color: 'yellow',
            age: 6,
            favoriteFood: 'chicken skin'
          });
      })
      .then(updatedDog => {
        expect(updatedDog.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Sam',
          color: 'yellow',
          age: 6,
          favoriteFood: 'chicken skin' 
        });
      });
  });

  it('deletes a dog by id', () => {
    return Dog
      .create({
        name: 'Hank',
        color: 'black',
        age: 10,
        favoriteFood: 'steakums' 
      })
      .then(createdDog => {
        return request(app)
          .delete(`/dogs/${createdDog._id}`);
      })
      .then(results => {
        expect(results.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Hank',
          color: 'black',
          age: 10,
          favoriteFood: 'steakums' 
        });
      });
  });

});
