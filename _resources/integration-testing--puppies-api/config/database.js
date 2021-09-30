var mongoose = require('mongoose');

// could check node env instead
// let databaseURL = process.env.DATABASE_URL

// if (process.env.NODE_ENV === 'test') {
//   databaseURL = 'mongodb://localhost/puppiestest'
// }

mongoose.connect(process.env.TEST_DATABASE_URL || process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

var db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

module.exports = db;
