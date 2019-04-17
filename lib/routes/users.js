const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      username,
      email
    } = req.body;
    
    User
      .create({ username, email })
      .then(createdUser => res.send(createdUser))
      .catch(next);
  });
