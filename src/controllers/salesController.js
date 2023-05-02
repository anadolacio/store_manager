const salesService = require('../services/salesService');

const getAllSales = async (req, res) => {
  const allSales = await salesService.getAllSales();
  if (!allSales) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(allSales);
};

const getOnlyIdSales = async (req, res) => {
  const { id } = req.params;
  const idSales = await salesService.getOnlyIdSales((id));
  if (!idSales || idSales.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(idSales);
};

// Criando sales:
const createSales = async (req, res) => {
  const { body } = req;
  const result = await salesService.createSales(body);
  if (result) return res.status(201).json(result);
};

module.exports = {
  getAllSales,
  getOnlyIdSales,
  createSales,
};
