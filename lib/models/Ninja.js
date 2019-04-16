const mongoose = require('mongoose');

const ninjaSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  tagline: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Ninja', ninjaSchema);
