const { Director } = require('../models');
const { ok, created, notFound, handleError } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.estado) where.estado = req.query.estado;
    return ok(res, await Director.findAll({ where, order: [['id', 'ASC']] }), 'Directores obtenidos correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.getById = async (req, res) => {
  try {
    const director = await Director.findByPk(req.params.id);
    if (!director) return notFound(res, 'Director no encontrado');
    return ok(res, director);
  } catch (error) { return handleError(res, error); }
};

exports.create = async (req, res) => {
  try {
    const { nombres, estado } = req.body;
    return created(res, await Director.create({ nombres, estado }), 'Director creado correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.update = async (req, res) => {
  try {
    const director = await Director.findByPk(req.params.id);
    if (!director) return notFound(res, 'Director no encontrado');
    const { nombres, estado } = req.body;
    await director.update({ nombres, estado });
    return ok(res, director, 'Director actualizado correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.remove = async (req, res) => {
  try {
    const director = await Director.findByPk(req.params.id);
    if (!director) return notFound(res, 'Director no encontrado');
    await director.destroy();
    return ok(res, null, 'Director eliminado correctamente');
  } catch (error) { return handleError(res, error); }
};
