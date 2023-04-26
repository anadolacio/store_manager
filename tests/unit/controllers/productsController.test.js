const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const { expect } = chai;

const productsController = require("../../../src/controllers/productsController");
const productsService = require("../../../src/services/productsService");

describe("Testa o controller de produtos", () => {
  describe('Success', () => {
    afterEach(() => {
      sinon.restore();
    });

    it("Testa se o controller funciona", async () => {
      sinon.stub(productsService, "getAllProducts").resolves({});
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().resolves({}),
      };

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith({});

      expect(productsService.getAllProducts).to.have.been.calledOnce;
    });
  });
  describe('Fails', () => {
    afterEach(() => {
      sinon.restore();
    });

    it("Testa se o controller falha", async () => {
      sinon.stub(productsService, "getAllProducts").resolves(null);
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().resolves({}),
      };

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(422);

      expect(res.json).to.have.been.calledWith({ err: { code: 'invalid_data', message: 'Wrong id format' } });

      expect(productsService.getAllProducts).to.have.been.calledOnce;
    });
  });
});