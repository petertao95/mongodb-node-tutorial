const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(('Unable to connect to mongodb'));
  }
  console.log('Connected to MongoDB server');
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("599de1ee25ce838e03120001")
  }, {
    $set: {
      completed: false
    },
    $inc: {
      votes: 1
    }
  }, {
    returnOriginal:false
  }).then((result) => {
    console.log(result);
  })

  // findOneAndDelete
  // deleteOne


  // db.close()
})
