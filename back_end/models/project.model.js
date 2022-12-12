var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
  name: {type: String, required: [true, "can't be blank"], index: true, unique:true, minlength:3},
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}, {timestamps: true});

module.exports = mongoose.model('Project', ProjectSchema);