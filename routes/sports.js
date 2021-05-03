var express = require('express');
var router = express.Router();

const SportsKind = require('../models/SportsKind');

/* List of available sports kinds */
router.get('/', function(req, res, next) {
  SportsKind.find({}, (err,response) => {
    res.json(response);
  });
});

module.exports = router;
