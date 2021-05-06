var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();

const Event = require('../models/Event');
const User = require('../models/User');

/* List of available events */
router.get('/', function(req, res, next) {
  const filter = {};
  if(req.query.group) {
    filter["group.code"] = req.query.group;
  }
  if(req.query.code) {
    
    filter["code"] = {$in : req.query.code};
  }
  Event.find(filter, (err,response) => {
    res.json(response);
  });
});

//New event creation
router.post('/', function(req, res, next) {

  let data = JSON.parse(req.body.data);
  let file = req.body.avatarFile;

  let avatar = '';
  if( file ) {
    const srcFileName = file.path.split('/').pop();
    const filePath = path.join(__dirname, `../public/images/events/`,srcFileName);
    const stream = fs.createWriteStream(filePath);
    stream.on('open', () => {
      file.pipe(stream);
    });
    data.avatar = srcFileName;
  }

  let event = new Event(data);

  event.save( (err, newEvent) => {
    //we need to update user data in order to add the newly created event's code to user events list
    User.updateOne(
      {code: data.createdBy},
      {$push: {
        'events': newEvent.code
      }},
      (err, data) => {
        if (err) { throw err; }
        res.send({redirect: `/sports/${newEvent.sports.code}/${newEvent.group.code}/event-${newEvent.code}`});
      }
    );
  });
});

router.get('/:code', function(req, res, next) {
  const filter = {
    code: req.params.code
  };
  Event.findOne(filter, (err,response) => {
    res.json(response);
  });
});

module.exports = router;
