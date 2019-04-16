const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  }
});
