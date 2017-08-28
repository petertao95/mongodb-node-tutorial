const express = require('express');
const {Post} = require('./../models/post');
const {ObjectID} = require('mongodb');

const router = express.Router();

router.get('/', function(req, res, next) {

  const lon = parseFloat(req.query.longitude) || 0;
  const lat = parseFloat(req.query.latitude) || 0;
  const radius = parseFloat(req.query.radius) || 10000000;
  const sort = req.query.sort || 'votes';

  Post.aggregate([
    { "$geoNear": {
        "near": [ lon , lat ],
        "distanceField": "distance",
        "maxDistance": radius,
        "num": 50,
        "spherical": true
     }},
     {"$sort": { "votes": -1 }}
 ], function(err, result) {
   if (err) {
     res.status(400).send({error: err})
   }
   res.send({data: result});
 });
});

router.post('/', function(req, res, next) {
  var new_post = new Post({
    user: req.body.user_id,
    media_type: req.body.media_type,
    thumbnail_url: req.body.thumbnail_url,
    media_url: req.body.media_url,
    geometry: {
      coordinates: [req.body.longitude, req.body.latitude]
    }
  });

  // use for bulk creating
  // var array = []
  // for(var i=0; i < 100000; i++) {
  //   array.push(new Post({
  //     _id : new ObjectID(),
  //     user: req.body.user_id,
  //     media_type: req.body.media_type,
  //     media_url: req.body.media_url,
  //     geometry: {
  //       coordinates: [req.body.longitude, req.body.latitude]
  //     }
  //   }));
  // }

  // console.log(array);
  // Post.insertMany(array).then(function(post){
  //   res.send("success")
  // }).catch(next);

  new_post.save().then((doc) => {
    res.send(doc)
  }, (error) => {
    res.status(400).send(error);
  });

});

router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var vote = req.body.vote;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(400).send('req not valid');
  }

  // Validate that request body has vote parameter
  if (!vote) {
    res.status(400).send({error: 'must specify vote'});
  }

  Post.findByIdAndUpdate(id, { $inc: {votes: vote}}, {new:true}).then((post) => {
    if(!post) {
      return res.status(404).send();
    }
    res.send({data: post});
  }).catch((e) => {
    res.status(400).send();
  });

});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(400).send('req not valid');
  }

  Post.findById(id).then((post) => {
    if(!post) {
      return res.status(404).send();
    }
    res.send({data: post});
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router
