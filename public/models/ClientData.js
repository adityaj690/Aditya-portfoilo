var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientDataSchema = new Schema({
    
    name: String,
    email: String,
    contactno: String,
    subject: String,
    message: String
});

module.exports = mongoose.model('ClientData', clientDataSchema);