const camelize = require('camelize');
const connection = require('./connection');

// Validar e cadastrar vendas:
const createDateOfSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  return result;
};

const createSales = async (insertId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [insertId, productId, quantity],
  );

  return result;
};

// Retornar todos as sales
const getAllSales = async () => {
  const [allSales] = await connection.execute(
      `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity FROM StoreManager.sales_products AS sp 
      INNER JOIN StoreManager.sales AS s
      WHERE sp.sale_id = s.id;`,
  );
  // console.log(allSales);
  const result = camelize(allSales);
  return result;
};

// Retonar sales com Id
const getOnlyIdSales = async (id) => {
  const [idSales] = await connection.execute(
      `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity FROM StoreManager.sales_products AS sp 
       INNER JOIN StoreManager.sales AS s
       WHERE sp.sale_id = ? AND s.id = sp.sale_id;`, [id],
  );
  const result = camelize(idSales);
  return result;
};

module.exports = {
  getAllSales,
  getOnlyIdSales,
  createSales,
  createDateOfSale,
};