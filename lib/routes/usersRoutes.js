const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      nickname,
      name,
      email
    } = req.body;

    User 
      .create({ nickname, name, email })
      .then(newUser => res.send(newUser))
      .catch(next);
  });
