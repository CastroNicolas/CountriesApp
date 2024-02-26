const { Sequelize, DataTypes } = require('sequelize')
const defineCountryModel = require('../src/models/Country');
describe('Country Model', () => {
    let sequelize;
  
    beforeAll(async () => {
      // Configurar sequelize con SQLite en memoria para pruebas
      sequelize = new Sequelize('sqlite::memory:', { logging: false });
  
      // Definir el modelo Country
      defineCountryModel(sequelize);
  
      // Sincronizar el modelo con la base de datos (crear tablas)
      await sequelize.sync();
    });
  
    afterAll(async () => {
      // Cerrar la conexión después de las pruebas
      await sequelize.close();
    });
  
    it('should create a new country', async () => {
        // Crear un país de ejemplo
        const country = await sequelize.models.Country.create({
            name: 'TestCountry',
            id: 'TST',
            imageFlag: 'test-flag.jpg',
            continent: 'TestContinent',
            capital: 'TestCapital',
            subregion: 'TestSubregion', // Agrega atributo subregion
            area: 1000.50, // Agrega atributo area
            population: '1000000',
        });
    
        // Obtener el país de la base de datos
        const fetchedCountry = await sequelize.models.Country.findByPk(country.id);
    
        // Asegurarse de que se creó correctamente y tiene los datos correctos
        expect(fetchedCountry.name).toBe('TestCountry');
        expect(fetchedCountry.id).toBe('TST');
        expect(fetchedCountry.imageFlag).toBe('test-flag.jpg');
        expect(fetchedCountry.continent).toBe('TestContinent');
        expect(fetchedCountry.capital).toBe('TestCapital');
        expect(fetchedCountry.subregion).toBe('TestSubregion'); // Agrega expectativa para subregion
        expect(fetchedCountry.area).toBe(1000.50); // Agrega expectativa para area
        expect(fetchedCountry.population).toBe('1000000');
    
    });
  
  
  });