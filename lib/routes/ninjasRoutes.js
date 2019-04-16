const { Router } = require('express');
const Ninja = require('../models/Ninja');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      nickname,
      age,
      tagline
    } = req.body;

    Ninja
      .create({ nickname, age, tagline })
      .then(newNinja => res.send(newNinja))
      .catch(next);
  });
