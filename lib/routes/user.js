const { Router } = require('express');
const User = require('../models/User');

module.exports = Router() 
    .post('/', (req, res, next) => {
        const {
            handle,
            name,
            email,
        } = req.body;

        User
            .create({ handle, name, email })
            .then(createdUser => res.send(createdUser))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        User
            .find()
            .lean()
            .select({
                __v: false
            })
            .then(allUsers => res.send(allUsers))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        User
            .findById(req.params.id)
            .lean()
            .select({
                __v: false
            })
            .then(user => res.send(user))
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {
        User
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .lean()
            .select({
                __v: false
            })
            .then(user => res.send(user))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        User
            .findByIdAndDelete(req.params.id)
            .lean()
            .select({
                __v: false
            })
            .then(deleted => res.send(deleted))
            .catch(next);
    });
    

    
