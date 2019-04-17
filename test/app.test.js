require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');
const Pirate = require('../lib/models/Pirate');


describe('Pirate routes', () => {
  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, useFindAndModify: false,
      useCreateIndex: true
    });
  });
  beforeEach(() => {
    mongoose.connection.dropDatabase();
  })
  afterAll(() => {
    mongoose.connection.close();
  });
  
  it('creates a new pirate document with POST', () => {
    return request(app)
      .post('/pirates')
      .send({ name: 'Steve the Pirate', ship: 'Her majesty\'s ugliest boat', pet: 'Slops' })
      .then(res => {
        expect(res.body).toEqual({ 
          name: 'Steve the Pirate',
          ship: 'Her majesty\'s ugliest boat',
          pet: 'Slops',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('creates a pirate document WITHOUT a non-required parameter POST', () => {
    return request(app)
      .post('/pirates')
      .send({
        name: 'Lila Bard',
        ship: 'A ship'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Lila Bard',
          ship: 'A ship',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('retrieve all docs with GET', () => {
    return Pirate.create({ name: 'King K Rull', ship:'The Jolly Roger', pet:'Donkey Kong' })
      .then(() => {
        return request(app)
          .get('/pirates')
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });
  it('find a single doc by id', () => {
    return Pirate.create({ name: 'King K Rull', ship:'The Jolly Roger', pet:'Donkey Kong' })
      .then(createdPirate => {
        return request(app)
          .get(`/pirates/${createdPirate._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'King K Rull', ship:'The Jolly Roger', pet:'Donkey Kong',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
  it('updates Pirate document when PATCH called', () => {
    return Pirate.create({name: 'Lila Bard', ship: 'Black Spire'})
      .then(createdPirate => {
        return request(app)
          .patch(`/pirates/${createdPirate._id}`)
          .send({ ship: 'The Sarrows'})
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Lila Bard',
          ship: 'The Sarrows',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('removes a document when DELETE called', () => {
    return Pirate.create({ name: 'Burly the Boar', ship: 'Riddled with Holes'})
      .then(createdPirate => {
        return request(app)
          .delete(`/pirates/${createdPirate._id}`)
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Burly the Boar',
          ship: 'Riddled with Holes',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});