const User = require('../models/User');
const { Router } = require('express');

module.exports = Router()
    .post('/', (req, res, next)=>{
        const {
            handle,
            image
        } = req.body;
        User
            .create({ handle, image })
            .then(res.send)
            .catch(next);
    })
    .delete('/:id', (req, res, next)=>{
        const { id } = req.params;
        User  
            .findByIdAndDelete(id)
            .then(res.send)
            .catch(next);
    });
