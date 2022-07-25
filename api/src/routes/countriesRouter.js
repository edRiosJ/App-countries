const { Router } = require('express');
const {getAllCountriesFromDB, getCountryByIdDB, getCountryByIdAPI, getCountryByNameDB, getCountryByNameAPI, setCountryInDB, getCountriesOrder} = require('../controllers/countriesController.js');
const countriesRouter = Router();

//* Ruta terminada
countriesRouter.get('/', async (req, res, next) =>
{
    const {name} = req.query;
    try
    {
        if(name)
        {
            const myName = name[0].toUpperCase() + name.slice(1);
            const result = await getCountryByNameDB(myName);
            // const result = await getCountryByNameAPI(myName);
            res.json(result);
        }
        else
        {
            const result = await getAllCountriesFromDB();
            res.json(result);
        }
    }
    catch(error)
    {
        next(error);
    }
});

countriesRouter.get('/order/', async (req, res, next) =>
{
    try
    {
        let {order} = req.query;
        const result = await getCountriesOrder(order);
        res.json(result);
    }
    catch(error)
    {
        next(error);
    }
});

//* Ruta terminada
countriesRouter.get('/:idCountry', async (req, res, next) =>
{
    try
    {
        let {idCountry} = req.params;
        let result = await getCountryByIdDB(idCountry.toUpperCase());
        // let result = await getCountryByIdAPI(idCountry.toUpperCase());
        res.json(result);
    }
    catch(error)
    {
        next(error);
    }
});



//* Ruta terminada
// countriesRouter.post('/newCountry/', async (req, res, next) =>
// {
//     try
//     {
//         let {id, name, imageFlag, continent, capital, subregion, area, population} = req.body;
//         if(!id || !name || !imageFlag || !continent || !capital) throw new Error("You're sending incomplete information");
//         const mySubregion = subregion ? subregion.trim(): null;
//         const country = await setCountryInDB(id.trim(), name.trim(), imageFlag.trim(), continent.trim(), capital.trim(), mySubregion, area, population);
//         res.json({msg: 'The country has been create successfully'});
//     }
//     catch(error)
//     {
//         next(error);
//     }
// });

module.exports = countriesRouter;