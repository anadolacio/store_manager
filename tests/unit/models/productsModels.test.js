const { expect } = require("chai");
const sinon = require("sinon");

const productsModels = require('../../../src/models/productsModels');
const connection = require('../../../src/models/connection');
const {
  getAllProductsMock,
  getAllMockNoData,
  getByIdProductMock,
  getByIdProductMockNoData,
} = require('./products.mock');

describe("Testa o models dos produtos", () => {
  describe("Success", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("Testa se todos os produtos são chamados", async () => {
      sinon.stub(connection, "execute").resolves([getAllProductsMock]);

      const allProducts = await productsModels.getAllProducts();

      expect(allProducts).to.be.deep.equal(getAllProductsMock);

      expect(connection.execute).to.have.been.calledOnce;
    });
  });

  it("Testa se nenhum produto é chamado", async () => {
    sinon.stub(connection, "execute").resolves([getAllMockNoData]);

    const allProducts = await productsModels.getAllProducts();

    expect(allProducts).to.be.deep.equal(getAllMockNoData);

    expect(connection.execute).to.have.been.calledOnce;
  });

  it("Testa se apenas um produto é chamado pelo is", async () => {
    sinon.stub(connection, "execute").resolves([getByIdProductMock]);

    const idProduct = await productsModels.getOnlyIdProducts(1);

    expect(idProduct).to.be.deep.equal(getByIdProductMock);

    expect(connection.execute).to.have.been.calledOnce;
  });

  it("Testa se nenhum produto é chamado com id inválido", async () => {
    sinon.stub(connection, "execute").resolves([getByIdProductMockNoData]);

    const idProduct = await productsModels.getOnlyIdProducts(1);

    expect(idProduct).to.be.deep.equal(getByIdProductMockNoData);
    expect(idProduct).to.have.length(0);
  });
});

describe("Fails", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Testa sse acontece a falha com valor nulo", async () => {
    sinon.stub(connection, "execute").resolves(null);

    const allProducts = await productsModels.getAllProducts();

    expect(allProducts).to.be.null;

    expect(connection.execute).to.have.been.calledOnce;
  });
});