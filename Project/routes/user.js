var express = require('express');
var multer = require('multer');

var router = express.Router();
/* multer dùng lưu các file đã chuyển sang nhị phân bằng
thao tác enctype bên users/create.pug
*/
var upload = multer({ dest: './public/uploads' });

var controller = require('../controllers/user');

router.get('/', controller.index);

router.get('/search', controller.search)

router.get('/create', controller.create)

router.get('/:id', controller.get)

router.post('/create', upload.single('avatar') , controller.postCreate)

module.exports = router;