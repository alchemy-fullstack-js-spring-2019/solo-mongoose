const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const Toy = require('../lib/models/Toys');

describe('tweet routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tweets', {
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

  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'cheri', body: 'a fine tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cheri',
          body: 'a fine tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of all tweets', () => {
    return Tweet
      .create({ handle: 'cheri', body: 'my tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  
  it('can get a tweet by id', () => {
    return Tweet 
      .create({ handle: 'stitch', body: 'gimmie a treat' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'stitch', 
          body: 'gimmie a treat',
          _id: expect.any(String),
          __v: 0
        });
      });
  }); 

  it('can update a tweet by id', () => {
    return Tweet
      .create({ handle: 'banjo', body: 'look but no touchy' })
      .then(createdTweet => {
        return request(app)
          .put(`/tweets/${createdTweet._id}`)
          .send({ handle: 'banjo', body: 'stay away from me!' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'banjo',
          body: 'stay away from me!',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can delete a tweet by id', () => {
    return Tweet
      .create({ handle: 'dan', body: 'I love data!' })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({  
          handle: 'dan', 
          body: 'I love data!',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can create a new toy', () => {
    return request(app)
      .post('/toys')
      .send({
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'green',
        condition: 'squeaker in critical condition'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'the pickle', 
          description: 'fuzzy pickle',
          color: 'green',
          condition: 'squeaker in critical condition',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of toys', () => {
    return Toy
      .create({ 
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'green',
        condition: 'squeaker in critical condition'
      })
      .then(() => {
        return request(app)
          .get('/toys');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a toy by id', () => {
    return Toy 
      .create({
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'green',
        condition: 'squeaker in critical condition'
      })
      .then(createdToy => {
        return request(app)
          .get(`/toys/${createdToy._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'the pickle', 
          description: 'fuzzy pickle',
          color: 'green',
          condition: 'squeaker in critical condition',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can update a toy', () => {
    return Toy
      .create({
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'purple',
        condition: 'squeaker in critical condition'
      })
      .then(createdToy => {
        return request(app)
          .put(`/toys/${createdToy._id}`)
          .send({
            name: 'the pickle', 
            description: 'fuzzy pickle',
            color: 'green',
            condition: 'squeaker in critical condition'
          })
          .then(res => {
            expect(res.body).toEqual({
              name: 'the pickle', 
              description: 'fuzzy pickle',
              color: 'green',
              condition: 'squeaker in critical condition',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('can delete a toy by id', () => {
    return Toy 
      .create({ 
        name: 'the pickle', 
        description: 'fuzzy pickle',
        color: 'green',
        condition: 'squeaker in critical condition'
      })
      .then(createdToy => {
        return request(app)
          .delete(`/toys/${createdToy._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'the pickle', 
          description: 'fuzzy pickle',
          color: 'green',
          condition: 'squeaker in critical condition',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
