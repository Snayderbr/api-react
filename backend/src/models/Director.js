const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Director = sequelize.define(
  'Director',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombres: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { notEmpty: { msg: 'El nombre del director es obligatorio' } },
    },
    estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      allowNull: false,
      defaultValue: 'Activo',
    },
  },
  {
    tableName: 'directores',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Director;
