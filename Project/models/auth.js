var mongoose = require('mongoose');


var registerSchema = new mongoose.Schema({
    email: String,
    password: String
});

var Register = mongoose.model('Register', registerSchema, 'register');

module.exports = Register;