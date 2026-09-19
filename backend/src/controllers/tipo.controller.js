const { Tipo } = require('../models');
const { ok, created, notFound, handleError } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    return ok(res, await Tipo.findAll({ order: [['id', 'ASC']] }), 'Tipos obtenidos correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.getById = async (req, res) => {
  try {
    const tipo = await Tipo.findByPk(req.params.id);
    if (!tipo) return notFound(res, 'Tipo no encontrado');
    return ok(res, tipo);
  } catch (error) { return handleError(res, error); }
};

exports.create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    return created(res, await Tipo.create({ nombre, descripcion }), 'Tipo creado correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.update = async (req, res) => {
  try {
    const tipo = await Tipo.findByPk(req.params.id);
    if (!tipo) return notFound(res, 'Tipo no encontrado');
    const { nombre, descripcion } = req.body;
    await tipo.update({ nombre, descripcion });
    return ok(res, tipo, 'Tipo actualizado correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.remove = async (req, res) => {
  try {
    const tipo = await Tipo.findByPk(req.params.id);
    if (!tipo) return notFound(res, 'Tipo no encontrado');
    await tipo.destroy();
    return ok(res, null, 'Tipo eliminado correctamente');
  } catch (error) { return handleError(res, error); }
};
