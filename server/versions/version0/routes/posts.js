const express = require('express');
const {Post} = require('./../models/post');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('GET /v0/posts');


});

router.post('/', function(req, res, next) {
  var new_post = new Post({
    user: req.body.user_id,
    media_type: req.body.media_type,
    media_url: req.body.media_url,
    geometry: {
      coordinates: [req.body.longitude, req.body.latitude]
    }
  });

  new_post.save().then((doc) => {
    res.send(doc)
  }, (error) => {
    res.status(400).send(error);
  });
});

router.put('/', function(req, res, next) {
  res.send('PUT /v0/posts');
});

module.exports = router
