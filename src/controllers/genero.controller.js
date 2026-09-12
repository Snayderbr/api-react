const { Genero } = require('../models');
const { ok, created, notFound, handleError } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.estado) where.estado = req.query.estado;
    const generos = await Genero.findAll({ where, order: [['id', 'ASC']] });
    return ok(res, generos, 'Géneros obtenidos correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.getById = async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return notFound(res, 'Género no encontrado');
    return ok(res, genero);
  } catch (error) { return handleError(res, error); }
};

exports.create = async (req, res) => {
  try {
    const { nombre, estado, descripcion } = req.body;
    return created(res, await Genero.create({ nombre, estado, descripcion }), 'Género creado correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.update = async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return notFound(res, 'Género no encontrado');
    const { nombre, estado, descripcion } = req.body;
    await genero.update({ nombre, estado, descripcion });
    return ok(res, genero, 'Género actualizado correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.remove = async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return notFound(res, 'Género no encontrado');
    await genero.destroy();
    return ok(res, null, 'Género eliminado correctamente');
  } catch (error) { return handleError(res, error); }
};
