var express = require('express');
var router = express.Router();

const Event = require('../models/Event');

/* List of available events */
router.get('/', function(req, res, next) {

console.log('QUERY',req.query);
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

router.get('/:code', function(req, res, next) {
  const filter = {
    code: req.params.code
  };
  Event.findOne(filter, (err,response) => {
    res.json(response);
  });
});

module.exports = router;
