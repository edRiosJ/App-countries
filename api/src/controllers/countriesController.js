const {Countries, Activities, Op} = require('../db.js');
const axios = require('axios');

//------------------------------------------------FUNCIONES DESDE LA DB------------------------------------
//* Funcion terminada
async function getAllCountriesFromDB()
{
    try
    {
        const countries = await Countries.findAll(
            {
                attributes: ['id', 'name', 'imageFlag', 'continent', 'population'],
                include:
                [
                    {
                        model: Activities,
                        attributes: ['name']
                    }
                ]
            });
        return countries;
    }
    catch(error)
    {
        throw error;
    }
}

//* Funcion terminada
async function getCountryByIdDB(idCountry)
{
    try
    {
        const country = await Countries.findByPk(idCountry,
            {
                include:
                [
                    {
                        model: Activities,
                        attributes: ['name', 'difficult', 'duration', 'season']
                    }
                ]
            });
        if(!country) throw new Error("I didn't find this country");
        return country;
    }
    catch(error)
    {
        throw error;
    }
}

//* Funcion terminada
async function getCountryByNameDB(nameCountry)
{
    try
    {
        const country = await Countries.findAll(
            {
                attributes: ['id', 'name', 'imageFlag', 'continent', 'population'],
                where:
                {
                    name:
                    {
                      [Op.like]: `%${nameCountry}%`
                    }
                },
                include:
                [
                    {
                        model: Activities,
                        attributes: ['name']
                    }
                ]
            });
        if(country.length === 0) throw new Error("I didn't find this country");
        return country;
    }
    catch(error)
    {
        throw error;
    }
}

async function getCountriesOrder(order)
{
    try
    {
        let myOrder;
        let countries = await Countries.findAll(
            {
                attributes: ['id', 'name', 'imageFlag', 'continent', 'population'],
                include:
                [
                    {
                        model: Activities,
                        attributes: ['name']
                    }
                ]
            });
        if(order === 'a-z') myOrder = countries.sort(sortByName);
        else if(order === 'z-a') myOrder = countries.sort(sortByName).reverse();
        else if(order === 'ascending') myOrder = countries.sort((a, b) => a.population - b.population);
        else myOrder = countries.sort((a, b) => b.population - a.population);

        return myOrder;
    }
    catch(error)
    {
        throw error;
    }
}

function sortByName(x, y)
{
    return x.name.localeCompare(y.name, 'fr', {ignorePunctuation: true});
}



// ---------------------------------------- FUNCIONES DESDE LA API ----------------------------------------

//* Funcion terminada
async function getCountryByNameAPI(nameCountry)
{
    try
    {
        const arrayCountries = (await axios(`https://restcountries.com/v3/name/${nameCountry}`)).data.map(el =>
        {
            if(el.capital && el.cca3 && el.name.common && el.flags[0] && el.region)
            {
                return {
                    id: el.cca3,
                    name: el.name.common,
                    imageFlag: el.flags[0],
                    continent: el.region
                }
            }
        });

        let countriesFilter = arrayCountries.filter(country => country !== undefined && country.name.includes(nameCountry));

        if(countriesFilter.length === 0) throw new Error("I didn't find this country");
        return countriesFilter;
    }
    catch(error)
    {
        throw new Error("I didn't find this country");
    }
}

//! Agregar consulta para actividades turisticas
// async function getCountryByIdAPI(idCountry)
// {
//     try
//     {
//         const country = (await axios(`https://restcountries.com/v3/alpha/${idCountry}`)).data.map(el =>
//         {
//             if(el.capital && el.cca3 && el.name.common && el.flags[0] && el.region)
//             {
//                 return {
//                     id: el.cca3,
//                     name: el.name.common,
//                     imageFlag: el.flags[0],
//                     continent: el.region,
//                     capital: el.capital[0],
//                     subregion: el.subregion,
//                     area: el.area,
//                     population: el.population
//                 }
//             }
//             throw new Error("I didn't find this country");
//         });
//         return country;
//     }
//     catch(error)
//     {
//         throw new Error("I didn't find this country");
//     }
// }

//-------------------------------------------- FUNCIONES PARA HACER PRUEBAS--------------------------------

//* Funcion terminada
async function setCountryInDB(id, name, imageFlag, continent, capital, subregion, area, population)
{
    try
    {
        const country = await Countries.create({id, name, imageFlag, continent, capital, subregion, area, population});

        return country;
    }
    catch(error)
    {
        throw error;
    }
}

module.exports =
{
    getAllCountriesFromDB,
    getCountryByIdDB,
    // getCountryByIdAPI,
    getCountryByNameDB,
    getCountryByNameAPI,
    setCountryInDB,
    getCountriesOrder
};