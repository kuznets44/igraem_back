const mongoose = require('mongoose');

const Event = mongoose.model('Event', new mongoose.Schema({
  name: 'String',
  code: 'String',
  avatar: 'String',
  active: 'Boolean',
  sports: {},
  group: {},
  participantsTotal: 'Number',
  dateStart: 'String',
  dateEnd: 'String',
  country: 'String',
  city: 'String',
  address: 'String',
  description: 'String',
  createdBy: 'String',
  createdAt: 'Date',
  participants: [{}]
}));

module.exports = Event;