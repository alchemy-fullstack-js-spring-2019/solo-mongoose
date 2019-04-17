const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const Ninja = require('../lib/models/Ninja');
require('dotenv').config();

describe('APP TESTS', () => {
  
  beforeAll(() => {
    return mongoose.connect(process.env.MONGODB_URI, {
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

  it('creates a new ninja', () => {
    return request(app)
      .post('/ninjas')
      .send({ nickname: 'nino', age: 20, tagline: 'death' })
      .then(res => {
        expect(res.body).toEqual({
          nickname: 'nino', 
          age: 20, 
          tagline: 'death',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('find a list of ninjas', () => {
    return Ninja
      .create([
        { nickname: 'nino', age: 20, tagline: 'death' },
        { nickname: 'tim', age: 33, tagline: 'winning' }
      ])
      .then(() => {
        return request(app)
          .get('/ninjas');
      })
      .then(res => {
        expect(res.body).toHaveLength(2);
      });
  });

  it('find by id', () => {
    return Ninja
      .create({ nickname: 'tim', age: 33, tagline: 'winning' })
      .then(data => {
        return request(app)
          .get(`/ninjas/${data._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          nickname: 'tim', 
          age: 33, 
          tagline: 'winning',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it.skip('update by id', () => {
    return Ninja
      .create({ nickname: 'tim', age: 33, tagline: 'winning' })
      .then(ninja => {
        return request(app)
          .put(`/ninjas/${ninja._id}`)
          .send({
            nickname: 'tim', 
            age: 18, 
            tagline: 'YAY!'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          nickname: 'tim', 
          age: 18, 
          tagline: 'YAY',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it.skip('delete by id', () => {
    return Ninja
      .create({ nickname: 'tim', age: 33, tagline: 'winning' })
      .then(data => {
        return request(app)
          .delete(`/ninjas/${data._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });

});
