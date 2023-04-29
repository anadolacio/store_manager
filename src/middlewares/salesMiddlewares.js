const productsService = require('../services/productsService');
const salesService = require('../services/salesService');

const productIdValidation = async (req, res, next) => {
  const { body } = req;

  for (let index = 0; index < body.length; index += 1) {
    if (!body[index].productId) {
      return res.status(400).send({ message: '"productId" is required' });
    }
  }

  return next();
};

const quantityValidation = async (req, res, next) => {
  const { body } = req;

  for (let index = 0; index < body.length; index += 1) {
    if (body[index].quantity === undefined) {
      return res.status(400).send({ message: '"quantity" is required' });
    }
  }

  return next();
};

const quantityLengthValidation = async (req, res, next) => {
  const { body } = req;

  for (let index = 0; index < body.length; index += 1) {
    if (body[index].quantity <= 0) {
      return res
        .status(422)
        .send({ message: '"quantity" must be greater than or equal to 1' });
    }
  }

  return next();
};

const isProductExist = async (req, res, next) => {
  const { body } = req;
  const result = await productsService.getAllProducts();
  for (let index = 0; index < body.length; index += 1) {
    const product = result.find((e) => e.id === body[index].productId);
    if (!product) return res.status(404).send({ message: 'Product not found' });
  }

  return next();
};

const isSaleExist = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.getSalesById(id);

  if (!result || result.length === 0) return res.status(404).send({ message: 'Sale not found' });

  return next();
};

module.exports = {
  productIdValidation,
  quantityLengthValidation,
  quantityValidation,
  isProductExist,
  isSaleExist,
};