const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

router.get('/', function(req, res, next){
  res.send("version 0 of the Breadcrumbs API")
});

module.exports = router
