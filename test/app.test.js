const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');
const Owner = require('../lib/models/Owner');

describe('dog route', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://127.0.0.1:27017/dogs', { 
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
        expect(res.body).toEqual({ name: 'Trevor', age: 600 });
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
        expect(res.body).toEqual({ name: 'Ted', age: 3 });
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
        expect(res.body).toEqual({ name: 'Trevor', age: 600, _id: expect.any(String) });
      });
  });
});

describe('owner route', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://127.0.0.1:27017/owners', { 
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

  it('create a new owner', () => {
    return request(app)
      .post('/owners')
      .send({ name: 'Clem', email: 'clemjim90@hotmail.com' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Clem',
          email: 'clemjim90@hotmail.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('get list of owners', () => {
    return Owner
      .create({ name: 'Clem', email: 'clemjim90@hotmail.com' })
      .then(() => {
        return request(app)
          .get('/owners');
      })
      .then(res => expect(res.body).toHaveLength(1));
  });

  it('get owner by ID', () => {
    return Owner
      .create({ name: 'Clem', email: 'clemjim90@hotmail.com' })
      .then(createdOwner => {
        return request(app)
          .get(`/owners/${createdOwner._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ name: 'Clem', email: 'clemjim90@hotmail.com', _id: expect.any(String) });
      });
  });

  it('update owner by ID', () => {
    return Owner
      .create({ name: 'Clem', email: 'clemjim90@hotmail.com' })
      .then(owner => {
        return request(app)
          .put(`/owners/${owner._id}`)
          .send({ name: 'Phleghm', email: 'phleghmjim90@hotmail.com' });
      })
      .then(res => {
        expect(res.body).toEqual({ name: 'Phleghm', email: 'phleghmjim90@hotmail.com', _id: expect.any(String) });
      });
  });

  it('delete by ID', () => {
    return Owner
      .create({ name: 'Clem', email: 'clemjim90@hotmail.com' })
      .then(owner => {
        return request(app)
          .delete(`/owners/${owner._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ _id: expect.any(String) });
      });
  });
});
