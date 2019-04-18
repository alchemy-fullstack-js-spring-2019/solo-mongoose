const mongoose = require('mongoose');

const ShipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'Pirate',
    required: true
  },
  sailCount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Ship', ShipSchema);
