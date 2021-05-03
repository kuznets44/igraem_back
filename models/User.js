const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  code: 'string',
  name: 'string',
  lastName: 'string',
  secondName: 'string',
  avatar: 'string'
}));

module.exports = User;