const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const productsMiddlewares = require('./middlewares/productsMiddlewares');
const salesMiddlewares = require('./middlewares/salesMiddlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Produtos

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getOnlyIdProducts);
app.post('/products', productsMiddlewares.productNameValidation, productsController.createProduct);
app.put('/products/:id',
productsMiddlewares.productNameValidation,
productsMiddlewares.productIdValidation, productsController.updateProduct);
app.delete('/products/:id', productsController.deleteProduct);

// Sales

app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getOnlyIdSales);
app.post(
  '/sales',
  salesMiddlewares.productIdValidation,
  salesMiddlewares.quantityValidation,
  salesMiddlewares.quantityLengthValidation,
  salesMiddlewares.isProductExist,
  salesController.createSales,
);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;