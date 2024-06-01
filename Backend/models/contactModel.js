const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an Email']
  },
  phone: {
    type: Number,
    required: [true, 'Please add phone number']
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);