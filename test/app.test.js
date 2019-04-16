const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('tweet routes', () => {
    // beforeAll(() => {
    //     mongoose.connect('mongodb://localhost:27107', {
    //         useNewUrlParser: true
    //     });
    // });
    // beforeEach(() => {
    //     return mongoose.connection.dropDatabase();
    // });
    // afterAll(() => {
    //     return mongoose.connection.close();
    // });

    it('is an empty test', () => {
        expect('we haven\'t written app yet').toBe('we haven\'t written app yet');
    });

});
