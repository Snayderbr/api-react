const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tipo = sequelize.define(
  'Tipo',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { notEmpty: { msg: 'El nombre del tipo es obligatorio' } },
    },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: 'tipos',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Tipo;
