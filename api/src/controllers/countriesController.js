const {Countries, Activities, Op} = require('../db.js');
const axios = require('axios');

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
    getCountryByNameDB,
    setCountryInDB,
    getCountriesOrder
};