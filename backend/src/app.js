const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API REST - Institución Universitaria Digital de Antioquia (Módulo Películas/Series)',
    modulos: ['generos', 'directores', 'productoras', 'tipos', 'medias']
  });
});

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

module.exports = app;
