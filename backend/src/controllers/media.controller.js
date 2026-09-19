const { Media, Genero, Director, Productora, Tipo } = require('../models');
const { ok, created, notFound, fail, handleError } = require('../utils/response');

const includeRelations = [
  { model: Genero, as: 'genero', attributes: ['id', 'nombre', 'estado'] },
  { model: Director, as: 'director', attributes: ['id', 'nombres', 'estado'] },
  { model: Productora, as: 'productora', attributes: ['id', 'nombre', 'estado'] },
  { model: Tipo, as: 'tipo', attributes: ['id', 'nombre'] },
];

async function validarRelacionesActivas({ genero_id, director_id, productora_id, tipo_id }) {
  const errores = [];

  const genero = await Genero.findByPk(genero_id);
  if (!genero) errores.push(`No existe un género con id ${genero_id}`);
  else if (genero.estado !== 'Activo') errores.push(`El género "${genero.nombre}" no está Activo`);

  const director = await Director.findByPk(director_id);
  if (!director) errores.push(`No existe un director con id ${director_id}`);
  else if (director.estado !== 'Activo') errores.push(`El director "${director.nombres}" no está Activo`);

  const productora = await Productora.findByPk(productora_id);
  if (!productora) errores.push(`No existe una productora con id ${productora_id}`);
  else if (productora.estado !== 'Activo') errores.push(`La productora "${productora.nombre}" no está Activa`);

  const tipo = await Tipo.findByPk(tipo_id);
  if (!tipo) errores.push(`No existe un tipo con id ${tipo_id}`);

  return errores;
}

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.genero_id) where.genero_id = req.query.genero_id;
    if (req.query.tipo_id) where.tipo_id = req.query.tipo_id;
    if (req.query.titulo) {
      const { Op } = require('sequelize');
      where.titulo = { [Op.like]: `%${req.query.titulo}%` };
    }

    const medias = await Media.findAll({
      where,
      include: includeRelations,
      order: [['id', 'DESC']],
    });
    return ok(res, medias, 'Películas/series obtenidas correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.getById = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id, { include: includeRelations });
    if (!media) return notFound(res, 'Película/serie no encontrada');
    return ok(res, media);
  } catch (error) { return handleError(res, error); }
};

exports.create = async (req, res) => {
  try {
    const { serial, titulo, sinopsis, url, imagen, anio_estreno, genero_id, director_id, productora_id, tipo_id } = req.body;
    const campos = { serial, titulo, url, anio_estreno, genero_id, director_id, productora_id, tipo_id };
    const faltantes = Object.entries(campos)
      .filter(([, v]) => v === undefined || v === null || v === '')
      .map(([k]) => k);

    if (faltantes.length) {
      return fail(res, 'Faltan campos obligatorios', 422, faltantes.map((f) => `El campo "${f}" es obligatorio`));
    }

    const errores = await validarRelacionesActivas({ genero_id, director_id, productora_id, tipo_id });
    if (errores.length) return fail(res, 'No se puede crear: relaciones inválidas o inactivas', 422, errores);

    const media = await Media.create({
      serial, titulo, sinopsis, url, imagen, anio_estreno,
      genero_id, director_id, productora_id, tipo_id,
    });

    return created(
      res,
      await Media.findByPk(media.id, { include: includeRelations }),
      'Película/serie creada correctamente'
    );
  } catch (error) { return handleError(res, error); }
};

exports.update = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return notFound(res, 'Película/serie no encontrada');

    const { serial, titulo, sinopsis, url, imagen, anio_estreno, genero_id, director_id, productora_id, tipo_id } = req.body;
    const relaciones = {
      genero_id: genero_id ?? media.genero_id,
      director_id: director_id ?? media.director_id,
      productora_id: productora_id ?? media.productora_id,
      tipo_id: tipo_id ?? media.tipo_id,
    };

    const errores = await validarRelacionesActivas(relaciones);
    if (errores.length) return fail(res, 'No se puede actualizar: relaciones inválidas o inactivas', 422, errores);

    await media.update({
      serial, titulo, sinopsis, url, imagen, anio_estreno,
      ...relaciones,
    });

    return ok(
      res,
      await Media.findByPk(media.id, { include: includeRelations }),
      'Película/serie actualizada correctamente'
    );
  } catch (error) { return handleError(res, error); }
};

exports.remove = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return notFound(res, 'Película/serie no encontrada');
    await media.destroy();
    return ok(res, null, 'Película/serie eliminada correctamente');
  } catch (error) { return handleError(res, error); }
};
