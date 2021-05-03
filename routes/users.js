var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, (err,response) => {
    res.json(response);
  });
});
/* GET user data */
router.get('/:code', function(req, res, next) {
  console.log(req.params);
  const filter = {
    code: req.params.code
  };
  User.findOne(filter, (err,response) => {
    res.json(response);
  });
});

module.exports = router;
