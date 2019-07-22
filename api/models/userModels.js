var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    phone_number: {
        type: String
    },
    citizen_id: {
        type: String
    },
    password: {
        type: String
    },
    link_account: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);