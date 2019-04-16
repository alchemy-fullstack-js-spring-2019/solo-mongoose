const mongoose = require('mongoose');

const quebecSchema = new mongoose.Schema({
  handle: {
    nom: String,
    // required: true
  },
  body: {
    text: true,
    // maxlength: 50
      
  }
});

const PasPire = mongoose.model('PasPire', quebecSchema);

module.exports = PasPire;
