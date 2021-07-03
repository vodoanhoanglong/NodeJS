var mongoose = require('mongoose');


var transferSchema = new mongoose.Schema({
    amount: String,
    accountId: String,
    userId: String
});

var Transfer = mongoose.model('Transfer', transferSchema, 'transfer');

module.exports = Transfer;