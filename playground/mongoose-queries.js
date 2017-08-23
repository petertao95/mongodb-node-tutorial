const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

var id = '599de689cd6de51bb4598618d'

if (!ObjectID.isValid(id)) {
  console.log(id, 'Id is not valid!')
}

User.find({}).then((users) => {
  console.log(users)
})

User.findOne({
  _id: id
}).then((user) => {
  console.log('User', user);
}).catch((e) => {
  console.log(e.message);
})
