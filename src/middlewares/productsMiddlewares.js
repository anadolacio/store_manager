const productsService = require('../services/productsService');
// Validação do nome do produto
const productNameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res
      .status(422)
      .send({ message: '"name" length must be at least 5 characters long' });
  }

  return next();
};

const productIdValidation = async (req, res, next) => {
  const { id } = req.params;

  const updateProduct = await productsService.getOnlyIdProducts(id);

  if (!updateProduct || updateProduct.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return next();
};

module.exports = {
  productNameValidation,
  productIdValidation,
};