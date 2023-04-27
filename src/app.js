const express = require('express');
const productsController = require('./controllers/productsController');
const productsMiddlewares = require('./middlewares/productsMiddlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getOnlyIdProducts);
app.post('/products', productsMiddlewares.productNameValidation, productsController.createProduct);
app.delete('/products/:id', productsController.deleteProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;