var express = require('express');
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
