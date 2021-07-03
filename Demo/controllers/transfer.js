const Transfer = require('../models/transfer');

module.exports.create = (req, res, next) => {
    res.render('transfer/create', {
        csrfToken: req.csrfToken()
    });
};

module.exports.postCreate = (req, res, next) => {
    var data = new Transfer({
        amount: req.body.amount,
        accountId: req.body.accountId,
        userId: req.signedCookies.userId
    });
    data.save(function (err, user) {
        if (err) return console.error(err);
        console.log(data.accountId + " saved to Users collection.");
    });
    res.redirect('/transfer/create');
};