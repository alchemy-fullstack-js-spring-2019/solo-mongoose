const { Router } = require('express');
const Ship = require('../models/Ship');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      owner,
      sailCount,
      color
    } = req.body;

    Ship
      .create({ name, owner, sailCount, color })
      .then(createdShip => res.send(createdShip))
      .catch(next);

  })

  .get('/', (req, res, next) => {
    Ship
      .find()
      .lean()
      .then(shipList => res.send(shipList))
      .catch(next);
  })
