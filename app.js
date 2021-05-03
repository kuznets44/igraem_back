var express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sportsRouter = require('./routes/sports');
var groupsRouter = require('./routes/groups');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}`;

var app = express();

mongoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },(err) => {
  if(err) {
    return 'DB connection error!';
  }

  console.log('DB connected');

  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/api/sports', sportsRouter);
  app.use('/api/groups', groupsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/events', eventsRouter);

});

module.exports = app;  
