const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const Ninja = require('../lib/models/Ninja');
const User = require('../lib/models/User');
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

  it('creates a new NINJA', () => {
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

  it('find a list of NINJAS', () => {
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

  it('find NINJA by id', () => {
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

  it('update NINJA by id', () => {
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
          tagline: 'YAY!',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('delete NINJA by id', () => {
    return Ninja
      .create({ nickname: 'delete', age: 0, tagline: 'me deleted' })
      .then(data => {
        return request(app)
          .delete(`/ninjas/${data._id}`)
          .then(res => {
            expect(res.body).toEqual({
              nickname: 'delete', 
              age: 0, 
              tagline: 'me deleted',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  //////////////- USERS -\\\\\\\\\\\\\\\

  const newUser = { nickname: 'user', name: 'userName', email: 'test@fake.com' };

  it('creates a new USER', () => {
    return request(app)
      .post('/users')
      .send(newUser)
      .then(res => {
        expect(res.body).toEqual({
          nickname: 'user', 
          name: 'userName', 
          email: 'test@fake.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('find a list of USERS', () => {
    return User
      .create(newUser)
      .then(() => {
        return request(app)
          .get('/users');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('find USER by id', () => {
    return User
      .create(newUser)
      .then(data => {
        return request(app)
          .get(`/users/${data._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          nickname: 'user', 
          name: 'userName', 
          email: 'test@fake.com',
          _id: expect.any(String),
        });
      });
  });

  it('update USER nickname by id', () => {
    return User
      .create(newUser)
      .then(user => {
        return request(app)
          .patch(`/users/${user._id}`)
          .send({
            nickname: 'updatednickname',
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          nickname: 'updatednickname', 
          name: 'userName', 
          email: 'test@fake.com',
          _id: expect.any(String),
        });
      });
  });
  
  it('update USER email & name by id', () => {
    return User
      .create(newUser)
      .then(user => {
        return request(app)
          .patch(`/users/${user._id}`)
          .send({
            email: 'updated@fake.com',
            name: 'fake'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          nickname: 'user', 
          name: 'fake', 
          email: 'updated@fake.com',
          _id: expect.any(String),
        });
      });
  });

  it('update USER nickname, email & name by id', () => {
    return User
      .create(newUser)
      .then(user => {
        return request(app)
          .patch(`/users/${user._id}`)
          .send({
            email: 'updated@fake.com',
            name: 'updated',
            nickname: 'updated'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          nickname: 'updated', 
          name: 'updated', 
          email: 'updated@fake.com',
          _id: expect.any(String),
        });
      });
  });

  it('delete USER by id', () => {
    return User
      .create(newUser)
      .then(data => {
        return request(app)
          .delete(`/users/${data._id}`)
          .then(res => {
            expect(res.body).toEqual({
              nickname: 'user', 
              name: 'userName', 
              email: 'test@fake.com',
              _id: expect.any(String),
            });
          });
      });
  });

});
