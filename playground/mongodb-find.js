const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(('Unable to connect to mongodb'));
  }
  console.log('Connected to MongoDB server');
  db.collection('Todos').find({
    _id: new ObjectID("599d9d7225ce838e0311fba2")
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('unable to fetch todos', err);
  })

  db.collection('Todos').find().count().then((count) => {
    console.log('Todos');
    console.log(count);
  }, (err) => {
    console.log('unable to fetch todos', err);
  })

  // db.close()
})
