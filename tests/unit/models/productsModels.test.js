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

  describe('testa a rota para criar um produto', function () {
    it('success', async function () {
      sinon.stub(connection, 'execute').resolves([newProduct]);

      const productCreated = await productsModels.createProduct({ name: "Colher de Pau", });

      expect(productCreated).to.be.contain.keys(['id', 'name']);
      expect(productCreated).to.be.an('object');
    })
  })

  describe('testa a rota para atualizar um produto', function () {
    it('success', async function () {
      sinon.stub(connection, 'execute').resolves([newProduct]);

      const productUpdated = await productsModels.updateProduct({
        "name": "Martelo de Thor"
      });
      expect(productUpdated).to.be.equal(newProduct);
      expect(productUpdated).to.be.contain.keys(['id', 'name']);
    })
  })
});

