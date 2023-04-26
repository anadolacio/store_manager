const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  const allProducts = await productsService.getAllProducts();
  return res.status(200).json(allProducts);
};

const getOnlyIdProducts = async (req, res) => {
  const { id } = req.params;
  const idProducts = await productsService.getOnlyIdProducts(Number(id));
  if (!idProducts) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(idProducts);
};

module.exports = {
  getAllProducts,
  getOnlyIdProducts,
};