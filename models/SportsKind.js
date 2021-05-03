const mongoose = require('mongoose');

const SportsKind = mongoose.model('SportsKind', new mongoose.Schema({
  name: 'string',
  code: 'string',
  icon: 'string'
}));

module.exports = SportsKind;