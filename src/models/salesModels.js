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
  const [allSales] = await connection
    .execute('SELECT * FROM StoreManager.sales_products;');
  return allSales;
};

// Retonar sales com Id
const getOnlyIdSales = async (id) => {
  const [[idSales]] = await connection
    .execute('SELECT * FROM StoreManager.sales WHERE sale_id=?;', [id]);
  return idSales;
};

module.exports = {
  getAllSales,
  getOnlyIdSales,
  createSales,
  createDateOfSale,
};