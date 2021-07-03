
var Register = require('../models/auth');

module.exports.login = (req, res) => {
    res.render('auth/login');
}

module.exports.postLogin = async (req, res) => {
    // req.body.email là theo thuộc tính name="email"
    var email = req.body.email;
    var password = req.body.password;
    const user = await Register.findOne({ email: email, password: password })
    if (!user) {
        res.render('auth/login', {
            err: ['Email or Password is wrong!'],
            values: req.body
        });
        return;
    }
    res.cookie('userId', user._id, {
        signed: true
    }); 
    res.redirect('/users');
}