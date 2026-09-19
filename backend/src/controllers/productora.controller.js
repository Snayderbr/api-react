const { Productora } = require('../models');
const { ok, created, notFound, handleError } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.estado) where.estado = req.query.estado;
    return ok(res, await Productora.findAll({ where, order: [['id', 'ASC']] }), 'Productoras obtenidas correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.getById = async (req, res) => {
  try {
    const productora = await Productora.findByPk(req.params.id);
    if (!productora) return notFound(res, 'Productora no encontrada');
    return ok(res, productora);
  } catch (error) { return handleError(res, error); }
};

exports.create = async (req, res) => {
  try {
    const { nombre, estado, slogan, descripcion } = req.body;
    return created(res, await Productora.create({ nombre, estado, slogan, descripcion }), 'Productora creada correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.update = async (req, res) => {
  try {
    const productora = await Productora.findByPk(req.params.id);
    if (!productora) return notFound(res, 'Productora no encontrada');
    const { nombre, estado, slogan, descripcion } = req.body;
    await productora.update({ nombre, estado, slogan, descripcion });
    return ok(res, productora, 'Productora actualizada correctamente');
  } catch (error) { return handleError(res, error); }
};

exports.remove = async (req, res) => {
  try {
    const productora = await Productora.findByPk(req.params.id);
    if (!productora) return notFound(res, 'Productora no encontrada');
    await productora.destroy();
    return ok(res, null, 'Productora eliminada correctamente');
  } catch (error) { return handleError(res, error); }
};
