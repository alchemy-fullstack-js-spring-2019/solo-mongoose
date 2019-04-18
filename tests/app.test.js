const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const Dog = require('../lib/models/Dog');

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
    return Dog.create({ handle: 'hello', name: 'fun', email: 'fun@hello.com' })
      .then(createdDog => {
        return request(app)
          .post('/tweets')
          .send({ user: createdDog._id, body: 'my tweet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          body: 'my tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can create a tweet with a futurama quote', () => {
    return Dog.create({ handle: 'dog', name: 'imadog', email: 'imadog@dog.com' })
      .then(createdDog => {
        return request(app)
          .post('/tweets')
          .send({ user: createdDog._id });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          body: expect.any(String),
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can get a list of all tweets', () => {
    return Dog.create({ handle: 'hello', name: 'fun', email: 'fun@hello.com' })
      .then(user => {
        return Tweet.create({ user: user._id, body: 'my tweet' });
      })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  it('can get a tweet by id', () => {
    return Dog.create({ handle: 'hello', name: 'fun', email: 'fun@hello.com' })
      .then(createdDog => {
        return Tweet.create({ user: createdDog._id, body: 'my next tweet' });
      })
      .then((createdTweet) => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'fun@hello.com',
            handle: 'hello',
            name: 'fun'
          },
          body: 'my next tweet',
          _id: expect.any(String)
        });
      });
  });
  it('can find a tweet by id and update', () => {
    return Dog.create({ handle: 'hello', name: 'fun', email: 'fun@hello.com' })
      .then(createdDog => {
        return Tweet.create({ user: createdDog._id, body: 'my next tweet' });
      })
      .then((createdTweet) => {
        return request(app)
          .patch(`/tweets/${createdTweet._id}`)
          .send({
            body: 'I\'m a Kiwi'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'fun@hello.com',
            handle: 'hello',
            name: 'fun'
          },
          body: 'I\'m a Kiwi',
          _id: expect.any(String)
        });
      });
  });
  it('finds by id and deletes', () => {
    return Dog.create({ handle: 'hello', name: 'fun', email: 'fun@hello.com' })
      .then(createdDog => {
        return Tweet.create({ user: createdDog._id, body: 'my next tweet' });
      })
      .then((createdTweet) => {
        return Promise.all([
          Promise.resolve(createdTweet._id.toString()),
          request(app)
            .delete(`/tweets/${createdTweet._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          _id
        });
      });
  });
});

describe('dog routes', () => {
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

  it('can create a new dog', () => {
    return request(app)
      .post('/dogs')
      .send({ name: 'bongo', handle: 'crazy', email: 'bongo@crazy.com' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'bongo',
          handle: 'crazy',
          email: 'bongo@crazy.com',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can get a list of all dogs', () => {
    return Dog
      .create({ name: 'meggo', handle: 'pug', email: 'meggo@crazy.com' })
      .then(() => {
        return request(app)
          .get('/dogs');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  it('can find a dog by id', () => {
    return Dog
      .create({ name: 'meggo', handle: 'pug', email: 'meggo@pug.com' })
      .then((createdDog) => {
        return request(app)
          .get(`/dogs/${createdDog._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'meggo',
          handle: 'pug',
          email: 'meggo@pug.com', 
          _id: expect.any(String)
        });
      });
  });
  it('can find a dog by id and update', () => {
    return Dog
      .create({ name: 'meggo', handle: 'pug', email: 'meggo@pug.com' })
      .then((createdDog) => {
        return request(app)
          .patch(`/dogs/${createdDog._id}`)
          .send({
            email: 'meggo@dog.com'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'meggo',
          handle: 'pug',
          email: 'meggo@dog.com', 
          _id: expect.any(String)
        });
      });
  });
  it('finds by id and deletes', () => {
    return Dog
      .create({ name: 'meggo', handle: 'pug', email: 'meggo@pug.com' })
      .then((createdDog) => {
        return request(app)
          .delete(`/dogs/${createdDog._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'meggo',
          handle: 'pug',
          email: 'meggo@pug.com', 
          _id: expect.any(String)
        });
      });
  });
});
