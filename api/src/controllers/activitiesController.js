const {Activities} = require('../db.js');

//* Funcion terminada
async function setActivityInDB(name, difficult, duration, season, country)
{
    try
    {
        const myName = name[0].toUpperCase() + name.slice(1);
        const mySeason = season[0].toUpperCase() + season.slice(1);
        const myCountry = country.map(el => el.toUpperCase());

        const activity = await Activities.findOrCreate(
            {
                where: {name: myName},
                defaults: {difficult,duration, season: mySeason}
            });

        if(activity[1] === false) throw new Error('This activity has already exist');
        else
        {
            activity[0].setCountries(myCountry)
            return activity[0];
        }
    }
    catch (error)
    {
        throw error;
    }
}

async function getActivities()
{
    try
    {
        const activities = await Activities.findAll(
            {
                attributes: ['id', 'name'],
            });
        return activities;
    }
    catch(error)
    {
        throw error;
    }
}

module.exports = {setActivityInDB, getActivities}