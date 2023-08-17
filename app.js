const express = require('express');
const bodyParser = require('body-parser');

const PORTS = {
  LOCALHOST: 3000,
};

const app = express();
const PORT = process.env.PORT || PORTS.LOCALHOST;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Ejemplo de una base de datos simulada en memoria
const products = [];

// Ejemplo de un endpoint para obtener todos los elementos de la base de datos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Ejemplo de un endpoint para agregar un elemento a la base de datos autoincrementando el id
app.post('/api/products', (req, res) => {
  const { body } = req;
  const id = products.length + 1;
  const product = { ...body, id };
  products.push(product);
  res.json(product);
});

// Ejemplo de un endpoint para actualizar un elemento de la base de datos
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const index = products.findIndex((item) => item.id === id);
  products[index] = body;
  res.json(body);
});

// Ejemplo de un endpoint para eliminar un elemento de la base de datos
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((item) => item.id === id);
  products.splice(index, 1);
  res.json({ id });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
