const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      text
    } = req.body;

    Tweet
      .create({ handle, text })
      .then(created => res.send(created))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(list => res.send(list))
      .catch(next);
  })
    
  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .then(found => {
        res.send(found);
      })
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const {
      handle,
      text
    } = req.body;

    const updateObj = {};
    if(handle){updateObj.handle = handle;}
    if(text){ updateObj.text = text;}

    return Tweet
      .findByIdAndUpdate(req.params.id, updateObj, { new: true })
      .then(result => res.send(result))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    return Tweet
      .findByIdAndDelete(req.params.id)
      .then(res.send({ deleted: 1 }))
      .catch(next);
  });
