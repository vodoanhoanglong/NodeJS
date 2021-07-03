var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    avatar: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;