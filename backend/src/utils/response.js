function ok(res, data, message = 'OK', status = 200) {
  return res.status(status).json({ success: true, message, data });
}

function created(res, data, message = 'Recurso creado correctamente') {
  return ok(res, data, message, 201);
}

function fail(res, message = 'Ocurrió un error', status = 400, errors = null) {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(status).json(body);
}

function notFound(res, message = 'Recurso no encontrado') {
  return fail(res, message, 404);
}

function handleError(res, error) {
  console.error(error);

  if (error.name === 'SequelizeValidationError') {
    return fail(res, 'Error de validación', 422, error.errors.map((e) => e.message));
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return fail(
      res,
      'Conflicto: valor duplicado',
      409,
      error.errors.map((e) => `El valor de "${e.path}" ya existe: ${e.value}`)
    );
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return fail(
      res,
      'Referencia inválida: verifica los IDs relacionados (género, director, productora, tipo)',
      409
    );
  }

  return fail(res, 'Error interno del servidor', 500, [error.message]);
}

module.exports = { ok, created, fail, notFound, handleError };
