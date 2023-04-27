const getAllProductsMock = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const getAllMockNoData = [];

const getByIdProductMock = [
  {
    id: 1,
    name: "Martelo de Thor",
  }];

const getByIdProductMockNoData = [];

const productNotFoundMock = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
  statusCode: 404
}

const newProduct =
  {
    id: 4,
    name: "Colher de Pau",
  };

module.exports = {
  getAllProductsMock,
  getAllMockNoData,
  getByIdProductMock,
  getByIdProductMockNoData,
  productNotFoundMock,
  newProduct,
};