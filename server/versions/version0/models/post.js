var mongoose = require('mongoose');
var User = require('./user');
const {Schema} = require('mongoose');

var postSchema = new Schema({
  user: {
    type: User,
    required: [true, 'device_id field is required']
  },
  media_type: {
    type: String,
    required: [true, 'media_type field is required']
  },
  media_url: {
    type: String,
    required: [true, 'media_url field is required']
  },
  thumbnail_url: {
    type: String,
    required: [true, 'thumbnail_url field is required']
  },
  votes: {
    type: Number,
    default: 0,
    required: [true, 'votes field is required']
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: [true, 'votes field is required']
  },
  geometry: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }}
  });

postSchema.index({votes: 1});

var Post = mongoose.model('Post', postSchema);

module.exports = {Post}
