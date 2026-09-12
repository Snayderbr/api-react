const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define(
  'Media',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    serial: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: { notEmpty: { msg: 'El serial es obligatorio' } },
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: { msg: 'El título es obligatorio' } },
    },
    sinopsis: { type: DataTypes.TEXT, allowNull: true },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
      validate: { notEmpty: { msg: 'La URL de la película/serie es obligatoria' } },
    },
    imagen: { type: DataTypes.STRING(500), allowNull: true },
    anio_estreno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1888], msg: 'El año de estreno no es válido' },
        max: { args: [2100], msg: 'El año de estreno no es válido' },
      },
    },
    genero_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'generos', key: 'id' } },
    director_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'directores', key: 'id' } },
    productora_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'productoras', key: 'id' } },
    tipo_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'tipos', key: 'id' } },
  },
  {
    tableName: 'medias',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Media;
