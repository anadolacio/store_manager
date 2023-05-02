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

// Deletar produto

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id =?;', [id]);
  return true;
};

// Atualizar produto:
// const updateProduct = async (id, name) => {
//   const [productUpdated] = await connection.execute(
//     'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
//     [name, id],
//   );
//   return productUpdated;
// };

module.exports = {
  getAllProducts,
  getOnlyIdProducts,
  createProduct,
  deleteProduct,
  // updateProdsuct,
};