const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  user: {
    type: String, // username
    required: true,
    default: 'anonymous'
  },
  role: {
    type: String,
    default: 'none'
  },
  action: {
    type: String,
    required: true
  },
  resource: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'denied'],
    required: true
  },
  ipAddress: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Log', LogSchema);
