var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();

const Group = require('../models/Group');
const User = require('../models/User');

/* List of available groups */
router.get('/', function(req, res, next) {
  console.log(req.query);
  const filter = {};
  if(req.query.sportskind) {
    filter["sports.code"] = req.query.sportskind;
  }
  console.log(filter);
  Group.find(filter, (err,response) => {
    res.json(response);
  });
});

router.post('/', function(req, res, next) {

  let data = JSON.parse(req.body.data);
  let file = req.body.avatarFile;

  let avatar = '';
  if( file ) {
    const srcFileName = file.path.split('/').pop();
    const filePath = path.join(__dirname, `../public/images/groups/`,srcFileName);
    const stream = fs.createWriteStream(filePath);
    stream.on('open', () => {
      file.pipe(stream);
    });
    data.avatar = srcFileName;
  }

  let group = new Group(data);

  let insertRes = group.save( (err, newGroup) => {
    let id = newGroup._id;

    const userNewGroupData = {
      _id: newGroup._id,
      name: newGroup.name,
      code: newGroup.code,
      avatar: newGroup.avatar,
      sportskind_code: newGroup.sports.code,
      role: 'admin'
    };

    User.updateOne(
      {code: data.createdBy},
      {$push: {
        'groups': userNewGroupData
      }},
      (err, data) => {
        if (err) { throw err; }
    
        res.send({redirect: `/sports/${newGroup.sports.code}/${newGroup.code}`});
      }
    );
  });
});


router.get('/:code', function(req, res, next) {
  console.log(req.params);
  const filter = {
    code: req.params.code
  };
  console.log(filter);
  Group.findOne(filter, (err,response) => {
    res.json(response);
  });
});

module.exports = router;
