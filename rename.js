const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect( err => {
  if(err) {
    console.log('err',err);
    return;  
  }

  const db = client.db(process.env.DB_NAME);
  db.collection('Users').rename('users');
  db.collection('Events').rename('events');
  db.collection('UserRoles').rename('userroles');
  console.log('done');
});
