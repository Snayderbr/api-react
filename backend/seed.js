require('dotenv').config();

const {
  sequelize,
  Genero,
  Tipo,
  Director,
  Productora,
  Media,
} = require('./src/models');

async function seed() {
  try {
    await sequelize.sync();

 
    const generos = [
      'Acción',
      'Aventura',
      'Ciencia Ficción',
      'Drama',
      'Terror',
    ];

    for (const nombre of generos) {
      await Genero.findOrCreate({
        where: { nombre },
        defaults: {
          estado: 'Activo',
          descripcion: `Género de ${nombre}`,
        },
      });
    }

   
    const tipos = ['Película', 'Serie'];

    for (const nombre of tipos) {
      await Tipo.findOrCreate({
        where: { nombre },
        defaults: {
          descripcion: `Contenido tipo ${nombre}`,
        },
      });
    }

  
    const [director] = await Director.findOrCreate({
      where: { nombres: 'James Cameron' },
      defaults: {
        estado: 'Activo',
      },
    });

   
    const [productora] = await Productora.findOrCreate({
      where: { nombre: '20th Century Fox' },
      defaults: {
        estado: 'Activo',
        slogan: 'The Stuff That Dreams Are Made Of',
        descripcion: 'Estudio de cine y televisión',
      },
    });

  
    const [genero] = await Genero.findOrCreate({
      where: { nombre: 'Ciencia Ficción' },
    });

    const [tipo] = await Tipo.findOrCreate({
      where: { nombre: 'Película' },
    });

    await Media.findOrCreate({
      where: { serial: 'AVT-001' },
      defaults: {
      titulo: 'Avatar',
      sinopsis:'Un exmarine se encuentra en medio de un conflicto entre los habitantes de Pandora y los humanos que buscan explotar sus recursos.',
      url: 'https://www.imdb.com/es/title/tt0499549/',
      imagen:'https://image.tmdb.org/t/p/original/fwmoeF44DXBk1tC30QFAiE0nwjT.jpg',
      anio_estreno: 2009,
      genero_id: genero.id,
      director_id: director.id,
      productora_id: productora.id,
      tipo_id: tipo.id,
  },
});


    process.exit(0);
  } catch (error) {
    console.error('❌ Error cargando datos iniciales:', error);
    process.exit(1);
  }
}

seed();