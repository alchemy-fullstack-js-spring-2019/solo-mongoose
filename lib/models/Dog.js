const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
