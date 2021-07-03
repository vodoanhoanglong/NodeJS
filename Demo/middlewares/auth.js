var Auth = require('../models/auth')

module.exports.requireAuth = async (req, res, next) =>
{
    // do dùng signed nên đổi từ req.cookies.userId -> req.signedCookies.userId
    if(!req.signedCookies.userId)
    {
        res.redirect('/auth/login');
        return;
    }

    const user = await Auth.findById(req.signedCookies.userId).exec();
    if(!user)
    {
        res.redirect('/auth/login');
        return;
    }
    // res.locals.succsess = true; biến này sẽ lưu giá trị các vòng đời res, req trong middleware
    res.locals.user = user;
    
    next();
}