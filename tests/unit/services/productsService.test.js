const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../src/models/productsModels');
const { getAllProductsMock, getByIdProductMock } = require('../models/mocks/products.mock');
const productsService = require('../../../src/services/productsService');

describe('Testa o service Products', function () {
  this.afterEach(() => {
    sinon.restore();
  })

  describe('Testa a rota pra todos os produtos', function () {
    it('sucess', async function () {
      sinon.stub(productsModels, 'getAllProducts').resolves(getAllProductsMock);

      const allProducts = await productsService.getAllProducts();

      expect(allProducts.type).to.be.equal(null);
      expect(allProducts.message).to.be.an('array');
      expect(allProducts.message).to.be.deep.equal(getAllProductsMock);
    })
  })

  describe('Testa a rota para id', function () {
    this.afterEach(() => {
      sinon.restore()
    })
    it('success', async function () {
      sinon.stub(productsModels, 'getOnlyIdProducts').resolves(getByIdProductMock);

      const idProduct = await productsService.getOnlyIdProducts(1);

      expect(idProduct.type).to.be.equal(null);
      expect(idProduct.message).to.be.an('object');
      expect(idProduct.message).to.be.deep.equal(getByIdProductMock);
    })

    it('com id inválido', async function () {
      sinon.stub(productsModels, 'getOnlyIdProducts').resolves(undefined);

      const idProduct = await productsService.getOnlyIdProducts(1);

      expect(idProduct.type).not.to.be.equal(null);
      expect(idProduct.message).to.be.equal('Product not found');
    })
  })
})