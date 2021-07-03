var User = require('../models/user');

var userArr;

module.exports.index = (req, res) => {
    User.find().then(users => {
        userArr = users;
        res.render('users/index', {
            users: users
        });
    })
}

module.exports.search = (req, res) => {
    var q = req.query.q;
    res.render('users/index', {
        users: userArr.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1),
        values: q
    });
}

module.exports.get = async (req, res) => {
    var id = req.params.id;

    const user = await User.findById(id).exec();
    res.render('users/view', {
        user: user
    });
}


module.exports.create = (req, res) => {
    res.render('users/create');
}

module.exports.postCreate = (req, res) => {
    req.body.avatar = req.file.path.split('\\').slice(1).join('\\').replace('\\', '/');
    var dataUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        avatar: req.body.avatar
    });
    dataUser.save(function (err, user) {
        if (err) return console.error(err);
        console.log(user.name + " saved to Users collection.");
    });
    res.redirect('/users');
}