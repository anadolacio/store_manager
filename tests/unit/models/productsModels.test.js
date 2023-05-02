const { expect } = require("chai");
const sinon = require("sinon");

const productsModels = require('../../../src/models/productsModels');
const connection = require('../../../src/models/connection');
const {
  getAllProductsMock,
  getByIdProductMock,
  newProduct,
} = require('./mocks/products.mock');

describe('Testa a ModelsProducts', function () {
  this.afterEach(() => {
    sinon.restore()
  })
  describe('testa se chama todos os produtos', () => {
    it('success', async function () {
      sinon.stub(connection, 'execute').resolves([getAllProductsMock]);

      const allProducts = await productsModels.getAllProducts();

      expect(allProducts).to.be.an('array');
      expect(allProducts).to.be.deep.equal(getAllProductsMock);
    });
  })

  describe('testa a rota para um id', function () {
    it('success', async function () {
      sinon.stub(connection, 'execute').resolves([[getByIdProductMock]]);

      const idProduct = await productsModels.getOnlyIdProducts(1);

      expect(idProduct).to.be.an('array');
      expect(idProduct).to.be.deep.equal(getByIdProductMock);
    })
  })
});