const { Router } = require('express');
const Ship = require('../models/Ship');

module.exports = Router()
  .get('/', (req, res, next) => {
    next();
  })