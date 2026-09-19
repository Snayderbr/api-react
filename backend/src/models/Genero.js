const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genero = sequelize.define(
  'Genero',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { notEmpty: { msg: 'El nombre del género es obligatorio' } },
    },
    estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      allowNull: false,
      defaultValue: 'Activo',
    },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: 'generos',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Genero;
