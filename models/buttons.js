
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ButtonsSchema = new Schema({
  value:{type: 'String', required: true},
  active:{type: 'Boolean', required: true},
  MAC:{type: 'String'}
});

var Button = mongoose.model('Button', ButtonsSchema);
module.exports = Button;
