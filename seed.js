require('dotenv').config();
const { sequelize, Genero, Tipo, Director, Productora } = require('./src/models');

async function seed() {
  try {
    await sequelize.sync({ alter: true });

    const generos = ['Acción', 'Aventura', 'Ciencia Ficción', 'Drama', 'Terror'];
    for (const nombre of generos) {
      await Genero.findOrCreate({
        where: { nombre },
        defaults: { estado: 'Activo', descripcion: `Género de ${nombre}` },
      });
    }

    const tipos = ['Película', 'Serie'];
    for (const nombre of tipos) {
      await Tipo.findOrCreate({
        where: { nombre },
        defaults: { descripcion: `Contenido tipo ${nombre}` },
      });
    }

    await Director.findOrCreate({
      where: { nombres: 'James Cameron' },
      defaults: { estado: 'Activo' },
    });

    await Productora.findOrCreate({
      where: { nombre: 'Warner Bros.' },
      defaults: {
        estado: 'Activo',
        slogan: 'The Stuff That Dreams Are Made Of',
        descripcion: 'Estudio de cine y televisión',
      },
    });

    console.log('✅ Datos iniciales cargados correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cargando datos iniciales:', error);
    process.exit(1);
  }
}

seed();
