const express = require('express');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('GET /v0/posts');
});

router.post('/', function(req, res, next) {
  res.send('POST /v0/posts');
});

router.put('/', function(req, res, next) {
  res.send('PUT /v0/posts');
});

module.exports = router
