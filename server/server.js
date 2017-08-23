var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user')

var app = express();
const port = 3000;

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


app.listen(port, () => {
  console.log(`Started app on port ${port}`);
});

module.exports = {app}
