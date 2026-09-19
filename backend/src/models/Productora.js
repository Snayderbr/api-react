const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Productora = sequelize.define(
  'Productora',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { notEmpty: { msg: 'El nombre de la productora es obligatorio' } },
    },
    estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      allowNull: false,
      defaultValue: 'Activo',
    },
    slogan: { type: DataTypes.STRING(255), allowNull: true },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: 'productoras',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Productora;
