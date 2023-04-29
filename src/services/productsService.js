const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const allProducts = await productsModels.getAllProducts();
  return allProducts;
};

const getOnlyIdProducts = async (id) => {
  const idProducts = await productsModels.getOnlyIdProducts(id);
  return idProducts;
};

const createProduct = async (name) => {
  const productCreated = await productsModels.createProduct(name);
  return productCreated;
};

const deleteProduct = async (id) => {
  const productDeleted = await productsModels.deleteProduct(id);
  return productDeleted;
};

// Atualizando produto:

// const updateProduct = async (productName, id) => {
//   await productsModels.updateProduct(productName, id);
//   const [{ name }] = await productsModels.getOnlyIdProducts(id);

//   return { id, name };
// }; 

module.exports = {
  getAllProducts,
  getOnlyIdProducts,
  createProduct,
  deleteProduct,
  // updateProduct,
};