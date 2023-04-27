const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const { expect } = chai;

const productsController = require("../../../src/controllers/productsController");
const productsService = require("../../../src/services/productsService");
const { getAllProductsMock, getByIdProductMock, productNotFoundMock } = require("../models/mocks/products.mock");

describe("Testa o controller", () => {
  describe('Testa se chama todos os produtos', function () {
    it('success', async function () {
      sinon.stub(productsService, 'getAllProducts').resolves(getAllProductsMock);
      const req = {}
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();


      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getAllProductsMock);

    })
  })

  describe('Testa a chamada para um id', function () {
    this.afterEach(() => {
      sinon.restore()
    })
      it('success', async function () {
      sinon.stub(productsService, 'getOnlyIdProducts').resolves(getByIdProductMock);
      const req = { params: { id: 1 } }
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();


      await productsController.getOnlyIdProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getByIdProductMock);
    });

    // it('com um id inválido', async function () {
    //   sinon.stub(productsService, 'getOnlyIdProducts').resolves(productNotFoundMock);
    //   const req = { params: { id: 000 } }
    //   const res = {}

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();


    //   await productsController.getOnlyIdProducts(req, res);

    //   expect(res.status).to.have.been.calledWith(404);
    //   expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    // })
  })
});