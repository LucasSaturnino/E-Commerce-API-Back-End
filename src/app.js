const express = require('express');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

// Registro das rotas
app.use('/v1', userRoutes);
app.use('/v1', categoryRoutes);
app.use('/v1', productRoutes);

module.exports = app;