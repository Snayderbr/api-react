const { Router } = require('express');

const generoRoutes = require('./genero.routes');
const directorRoutes = require('./director.routes');
const productoraRoutes = require('./productora.routes');
const tipoRoutes = require('./tipo.routes');
const mediaRoutes = require('./media.routes');

const router = Router();

router.use('/generos', generoRoutes);
router.use('/directores', directorRoutes);
router.use('/productoras', productoraRoutes);
router.use('/tipos', tipoRoutes);
router.use('/medias', mediaRoutes);

module.exports = router;
