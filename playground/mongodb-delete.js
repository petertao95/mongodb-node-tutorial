const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(('Unable to connect to mongodb'));
  }
  console.log('Connected to MongoDB server');
  db.collection('Todos').deleteMany({text: "finish node tutorials"}).then((result) => {
    console.log(result);
  })

  // findOneAndDelete
  // deleteOne


  // db.close()
})
