var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user')

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  // create new users
  // save the users

  var new_user = new User({
    device_id: req.body.device_id
  });

  new_user.save().then((doc) => {
    res.send(doc)
  }, (error) => {
    res.status(400).send(error);
  });
});

app.get('/', (req, res) => {
  res.send('Breadcrumbs API');
});

app.get('/users', (req, res) => {
  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/users/:id', (req, res) => {
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



app.listen(port, () => {
  console.log(`Started app on port ${port}`);
});

module.exports = {app}
