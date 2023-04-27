const connection = require('./connection');

// Retornar todos os produtos
const getAllProducts = async () => {
  const [allProducts] = await connection
    .execute('SELECT * FROM StoreManager.products ORDER BY id;');
  return allProducts;
};

// Retorna apenas produto com id
const getOnlyIdProducts = async (id) => {
  const [[idProducts]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id=?;', [id]);
  return idProducts;
};

// Cadastrar produto

const createProduct = async ({ name }) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?);', [name]);
  return { id: insertId, name };
};

module.exports = {
  getAllProducts,
  getOnlyIdProducts,
  createProduct,
};