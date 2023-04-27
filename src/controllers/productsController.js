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

const createProduct = async (req, res) => {
  const name = req.body;
  const productCreated = await productsService.createProduct(name);
  return res.status(201).json(productCreated);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const product = await productsService.getOnlyIdProducts(numberId);
  console.log(product);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  await productsService.deleteProduct(numberId);
  return res.status(204).json();
};

module.exports = {
  getAllProducts,
  getOnlyIdProducts,
  createProduct,
  deleteProduct,
};