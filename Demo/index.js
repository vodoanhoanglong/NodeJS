require('dotenv').config();
require('./initDB')();


const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const transferRoute = require('./routes/transfer');
const apiProductRoute = require('./api/routes/product');
const authMiddleware = require('./middlewares/auth');

const port = process.env.PORT || 3000;


const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
// khi post lên là undefine cần 2 dòng dưới để biến nó thành chuỗi lại
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
// sẽ render ra nội dung file trong folder public
// localhost:3000/styles/custom.css sẽ ra conten file đó. Lấy hình ảnh ra.
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET)); // đọc dữ liệu từ console.log() nếu không có sẽ hiển thị undefine

app.get('/', function (req, res) {
    res.render('index')
})


app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use(csrf({ cookie: true })); // nên để ở nơi cần tạo token, vd như là trên dịch vụ chuyển tiền
app.use('/transfer', authMiddleware.requireAuth, transferRoute);
app.use('/api/products', apiProductRoute);

app.listen(port, function () {
    console.log('Server listening on port ' + port);
})