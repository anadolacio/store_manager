const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const allProducts = await productsModels.getAllProducts();
  return allProducts;
};

const getOnlyIdProducts = async (id) => {
  const idProducts = await productsModels.getOnlyIdProducts(id);
  return idProducts;
};

module.exports = {
  getAllProducts,
  getOnlyIdProducts,
};