var express = require('express');
const os = require("os");
const cors = require('cors');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const formData = require("express-form-data");

/* routers */
var usersRouter = require('./routes/users');
var sportsRouter = require('./routes/sports');
var groupsRouter = require('./routes/groups');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');


var app = express();

//DB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}`;

mongoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },(err) => {
  if(err) {
    return 'DB connection error!';
  }

  console.log('DB connected');
  // parse data with connect-multiparty. 
  app.use(formData.parse({
    uploadDir: os.tmpdir(),
    autoClean: true
  }));
  // delete from the request all empty files (size == 0)
  app.use(formData.format());
  // change the file objects to fs.ReadStream 
  app.use(formData.stream());
  // union the body and the files
  app.use(formData.union());

  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use('/api/sports', sportsRouter);
  app.use('/api/groups', groupsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/events', eventsRouter);

});

module.exports = app;  
