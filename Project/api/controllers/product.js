var Product = require('../../models/product');

module.exports.index = async (req, res) => {

  	var products = await Product.find();
	res.json(products);
};

// khi có người đưa dữ liệu vào trang thông qua Post của Rest API
// thì sẽ lưu vào file Json và DB  
module.exports.create = async (req, res) => {
	var products = await Product.create(req.body);
	res.json(products);
}