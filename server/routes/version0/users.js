const express = require('express');
const {User} = require('./../../models/user')
const {ObjectID} = require('mongodb');

const router = express.Router();

router.post('/', (req, res) => {

  var new_user = new User({
    device_id: req.body.device_id
  });

  new_user.save().then((doc) => {
    res.send(doc)
  }, (error) => {
    res.status(400).send(error);
  });
});

router.get('/', (req, res) => {
  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(400).send('req not valid');
  }

  User.findById(id).then((user) => {
    if(!user) {
      return res.status(404).send();
    }
    res.send({user: user});
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router
