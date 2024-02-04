const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../src/models/productsModels');
const { getAllProductsMock, getByIdProductMock, newProduct } = require('../models/mocks/products.mock');
const productsService = require('../../../src/services/productsService');

describe('Testa o service Products', function () {
  this.afterEach(() => {
    sinon.restore();
  })

  describe('Testa a rota pra todos os produtos', function () {
    it('sucess', async function () {
      sinon.stub(productsModels, 'getAllProducts').resolves(getAllProductsMock);

      const allProducts = await productsService.getAllProducts();

      expect(allProducts).to.be.an('array');
      expect(allProducts).to.be.deep.equal(getAllProductsMock);
    })
  })

  describe('Testa a rota para id', function () {
     it('success', async function () {
      sinon.stub(productsModels, 'getOnlyIdProducts').resolves(getByIdProductMock);

      const idProduct = await productsService.getOnlyIdProducts(1);

      expect(idProduct).to.be.an('array');
      expect(idProduct).to.be.deep.equal(getByIdProductMock);
    })

    describe('testa a rota para criar um produto', function () {
      it('success', async function () {
        sinon.stub(productsModels, 'createProduct').resolves(newProduct);

        const productCreated = await productsModels.createProduct("Colher de Pau");

        expect(productCreated).to.be.contain.keys(['id', 'name']);
        expect(productCreated).to.be.an('object');
      })
    })

    describe('testa a rota para atualizar um produto', function () {
      it('success', async function () {
        sinon.stub(productsModels, 'updateProduct').resolves([newProduct]);

        const productUpdated = await productsModels.updateProduct({
          name: "Colher de Pau"
        });
        expect(productUpdated).to.be.an("array");
      })
    })
  })
});