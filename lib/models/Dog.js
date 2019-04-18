const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: mongoose.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
