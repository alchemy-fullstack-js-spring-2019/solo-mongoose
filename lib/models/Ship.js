const mongoose = require('mongoose');

const ShipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  owner: {
    type: String,
    require: true
  },
  sailCount: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: 'Brown'
  }
});

module.exports = mongoose.model('Ship', ShipSchema);
