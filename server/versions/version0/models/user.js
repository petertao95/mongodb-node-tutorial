var mongoose = require('mongoose');

var User = mongoose.model('User', {
  device_id: {
    type: String,
    required: true,
    minlength: 1,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = {User}
