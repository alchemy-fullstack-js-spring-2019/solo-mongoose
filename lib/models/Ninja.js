const mongoose = require('mongoose');

const ninjaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  tagline: {
    type: String,
    required: true,
    maxlength: 144
  }

});

module.exports = mongoose.model('Ninja', ninjaSchema);
