const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app.js');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

describe('tweet routes', () => {
    
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost:27017/tweets', {
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

    it('creates a tweet', () => {
        return User.create({ handle: 'handle', name: 'name', email: 'email' })
            .then(user => {
                return request(app)
                    .post('/tweet')
                    .send({ user: user._id, body: 'this is my tweet' });
            })
            .then(res => {
                expect(res.body).toEqual({ user: expect.any(String), body: 'this is my tweet', _id: expect.any(String), __v: 0 });
            });
    });

    it('gets a list of all tweets', () => {
        return User.create({ handle: 'handle', name: 'name', email: 'email' })
            .then(user => {
                return Tweet.create({ user: user._id, body: 'this is my tweet' });
            })
            .then(() => {
                return request(app)
                    .get('/tweet');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });

    it('gets a tweet by id', () => {
        return User.create({ handle: 'handle', name: 'name', email: 'email' })
            .then(user => {
                return Tweet.create({ user: user._id, body: 'this is my tweet' });
            })
            .then(tweet => {
                return request(app)
                    .get(`/tweet/${tweet._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    user: { handle: 'handle', name: 'name', email: 'email', _id: expect.any(String) },
                    body: 'this is my tweet',
                    _id: expect.any(String)
                });
            });
    });

    it('updates a tweet', () => {
        return User.create({ handle: 'handle', name: 'name', email: 'email' })
            .then(user => {
                return Tweet.create({ user: user._id, body: 'this is my tweet' });
            })
            .then(tweet => {
                return request(app)
                    .patch(`/tweet/${tweet._id}`)
                    .send({ body: 'updated' });
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    user: { handle: 'handle', name: 'name', email: 'email', _id: expect.any(String) }, 
                    body: 'updated',
                    _id: expect.any(String),
                });
            });
    });

    it('deletes a tweet', () => {
        return User.create({ handle: 'handle', name: 'name', email: 'email' })
            .then(user => {
                return Tweet.create({ user: user._id, body: 'this is my tweet' });
            })
            .then(tweet => {
                return request(app)
                    .delete(`/tweet/${tweet._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    user: { handle: 'handle', name: 'name', email: 'email', _id: expect.any(String) }, 
                    body: 'this is my tweet',
                    _id: expect.any(String)
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

    it('creates a user', () => {
        return request(app)
            .post('/user')
            .send({ handle: '@anna', name: 'Anna', email: 'email@email.com' })
            .then(res => {
                expect(res.body).toEqual({ handle: '@anna', name: 'Anna', email: 'email@email.com', _id: expect.any(String), __v: 0 });
            });
    });

    it('gets a list of all users', () => {
        return User.create({
            handle: '@anna',
            name: 'Anna',
            email: 'email@email.com' 
        })
            .then(() => {
                return request(app)
                    .get('/user');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });

    it('gets a user by id', () => {
        return User.create({
            handle: '@anna',
            name: 'Anna',
            email: 'email@email.com' 
        })
            .then(user => {
                return request(app)
                    .get(`/user/${user._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: '@anna',
                    name: 'Anna',
                    email: 'email@email.com', 
                    _id: expect.any(String),
                });
            });
    });

    it('updates a user', () => {
        return User.create({
            handle: '@anna',
            name: 'Anna',
            email: 'email@email.com' 
        })
            .then(user => {
                return request(app)
                    .patch(`/user/${user._id}`)
                    .send({ email: 'new@gmail.com' });
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: '@anna',
                    name: 'Anna',
                    email: 'new@gmail.com', 
                    _id: expect.any(String),
                });
            });
    });

    it('deletes a user', () => {
        return User.create({
            handle: '@anna',
            name: 'Anna',
            email: 'email@email.com' 
        })
            .then(user => {
                return request(app)
                    .delete(`/user/${user._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: '@anna',
                    name: 'Anna',
                    email: 'email@email.com', 
                    _id: expect.any(String)
                });
            });
    });
});
