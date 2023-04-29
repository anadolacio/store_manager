const salesModels = require('../models/salesModels');

const getAllSales = async () => {
  const allSales = await salesModels.getAllSales();
  return allSales;
};

const getOnlyIdSales = async (id) => {
  const idSales = await salesModels.getOnlyIdSales(id);
  return idSales;
};

// Criando sales

const createSales = async (body) => {
  const { insertId } = await salesModels.createDateOfSale();

  const result = body.map(({ productId, quantity }) =>
    salesModels.createSales(insertId, productId, quantity));

  await Promise.all(result);

  return {
    id: insertId,
    itemsSold: body,
  };
};

module.exports = {
  getAllSales,
  getOnlyIdSales,
  createSales,
};