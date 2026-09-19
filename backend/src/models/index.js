const sequelize = require('../config/database');
const Genero = require('./Genero');
const Director = require('./Director');
const Productora = require('./Productora');
const Tipo = require('./Tipo');
const Media = require('./Media');

Genero.hasMany(Media, { foreignKey: 'genero_id' });
Media.belongsTo(Genero, { foreignKey: 'genero_id', as: 'genero' });

Director.hasMany(Media, { foreignKey: 'director_id' });
Media.belongsTo(Director, { foreignKey: 'director_id', as: 'director' });

Productora.hasMany(Media, { foreignKey: 'productora_id' });
Media.belongsTo(Productora, { foreignKey: 'productora_id', as: 'productora' });

Tipo.hasMany(Media, { foreignKey: 'tipo_id' });
Media.belongsTo(Tipo, { foreignKey: 'tipo_id', as: 'tipo' });

module.exports = { sequelize, Genero, Director, Productora, Tipo, Media };
