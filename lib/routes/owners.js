const { Router } = require('express');
const Owner = require('../models/Owner');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      email
    } = req.body;
    
    Owner
      .create({ name, email })
      .then(createdUser => res.send(createdUser))
      .catch(next);
  });
