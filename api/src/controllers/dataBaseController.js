const axios = require('axios');
const {Countries} = require('../db.js')

//* Funcion terminada
async function getCountriesFromAPI()
{
    try
    {
            let arrayCountries = (await axios('https://restcountries.com/v3/all')).data.map(country =>
            {
                if(country.capital && country.cca3 && country.name.common && country.flags[0] && country.region)
                {
                    return {
                        id: country.cca3,
                        name: country.name.common,
                        imageFlag: country.flags[0],
                        continent: country.region,
                        capital: country.capital[0],
                        subregion: country.subregion,
                        area: country.area <= 0 ? null:country.area,
                        population: country.population
                    }
                }
            });

        let countriesFilter = arrayCountries.filter(country => country !== undefined);

        await Countries.bulkCreate(countriesFilter,{validate: true});
        console.log('Base de datos cargada');
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = {getCountriesFromAPI};