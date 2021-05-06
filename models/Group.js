const mongoose = require('mongoose');

const Group = mongoose.model('Group', new mongoose.Schema({
  name: 'String',
  code: 'String',
  avatar: 'String',
  active: 'Boolean',
  country: 'String',
  city: 'String',
  address: 'String',
  description: 'String',
  createdBy: 'String',
  createdAt: 'Date',
  sports: {},
  participants: [{}]
}));

module.exports = Group;