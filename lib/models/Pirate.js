const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ship: {
    type: String,
    required: true
  },
  pet: {
    type: String
  }
});

module.exports = mongoose.model('Pirate', PirateSchema);
