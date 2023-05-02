const salesModels = require('../models/salesModels');

const getAllSales = async () => {
  const allSales = await salesModels.getAllSales();
  const allIdSales = allSales.map((element) => {
    const { saleId, date, productId, quantity } = element;
    return {
      saleId,
      date,
      productId,
      quantity,
    };
  });
  return allIdSales;
};

const getOnlyIdSales = async (id) => {
  const idSales = await salesModels.getOnlyIdSales(id);
  const allSalesWithId = idSales.map((sale) => {
    const { date, productId, quantity } = sale;
    return {
      date,
      productId,
      quantity,
    };
  });

  return allSalesWithId;
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