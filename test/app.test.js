const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');
const User = require('../lib/models/User');

describe('dog routes', () => {
  const createDog = () => {
    return User.create({
      handle: '@leslie',
      name: 'leslie',
      email: 'leslie@gmail.com'
    })
      .then(user => {
        return Dog.create({
          owner: user._id,
          name: 'buddy',
          age: 2,
          breed: 'golden retriever'
        });
      });
  };

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
    return User.create({
      handle: '@leslie',
      name: 'leslie',
      email: 'leslie@gmail.com'
    })
      .then(user => {
        return request(app)
          .post('/dogs')
          .send({
            owner: user._id,
            name: 'buddy',
            age: 2,
            breed: 'mini goldendoodle'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          owner: expect.any(String),
          name: 'buddy',
          age: 2,
          breed: 'mini goldendoodle',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can find a list of dogs', () => {
    return createDog()
      .then(() => {
        return request(app)
          .get('/dogs');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a dog by id', () => {
    return createDog()
      .then(createdDog => {
        return request(app)
          .get(`/dogs/${createdDog._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          owner: {
            handle: '@leslie',
            name: 'leslie',
            email: 'leslie@gmail.com',
            _id: expect.any(String)
          },
          name: 'buddy',
          age: 2,
          breed: 'golden retriever',
          _id: expect.any(String)
        });
      });
  });

  it('can update a dog by id', () => {
    return createDog()
      .then(createdDog => {
        return request(app)
          .patch(`/dogs/${createdDog._id}`)
          .send({
            name: 'buddy'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          owner: {
            handle: '@leslie',
            name: 'leslie',
            email: 'leslie@gmail.com',
            _id: expect.any(String)
          },
          name: 'buddy',
          age: 2,
          breed: 'golden retriever',
          _id: expect.any(String)
        });
      });
  });

  it('can delete a dog by id', () => {
    return createDog()
      .then(createdDog => {
        return Promise.all([
          Promise.resolve(createdDog._id.toString()),
          request(app)
            .delete(`/dogs/${createdDog._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          _id
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

  it('can find a list of users', () => {
    return User.create({
      handle: '@leslie',
      name: 'leslie',
      email: 'leslie@gmail.com'
    })
      .then(() => {
        return request(app)
          .get('/users');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a user by id', () => {
    return User.create({
      handle: '@leslie',
      name: 'leslie',
      email: 'leslie@gmail.com'
    })
      .then(createdUser => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: '@leslie',
          name: 'leslie',
          email: 'leslie@gmail.com',
          _id: expect.any(String)
        });
      });
  });

  it('can update a user by id', () => {
    return User.create({
      handle: '@@leslie',
      name: 'leslie',
      email: 'leslie@gmail.com'
    })
      .then(createdUser => {
        return request(app)
          .patch(`/users/${createdUser._id}`)
          .send({
            handle: '@leslie'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: '@leslie',
          name: 'leslie',
          email: 'leslie@gmail.com',
          _id: expect.any(String)
        });
      });
  });

  it('can delete a user by id', () => {
    return User.create({
      handle: '@leslie',
      name: 'leslie',
      email: 'leslie@gmail.com'
    })
      .then(createdUser => {
        return request(app)
          .delete(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: '@leslie',
          name: 'leslie',
          email: 'leslie@gmail.com',
          _id: expect.any(String)
        });
      });
  });
});
