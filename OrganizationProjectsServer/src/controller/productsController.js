const Products = require('../models/products');

const products_listing = async (req, res) => {
  const products_list = await Products.find().sort({ created_at: 'desc'});
  res.send(products_list);
}

module.exports = {
  products_listing
}
