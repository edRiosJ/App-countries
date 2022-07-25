const { Router } = require('express');
const {setActivityInDB, getActivities} = require('../controllers/activitiesController.js');
const activitiesRouter = Router();

activitiesRouter.post('/', async (req, res, next) =>
{
    try
    {
        const {name, difficult, duration, season, country} = req.body;
        if(!name || !difficult || !duration || !season || !country) throw new Error("You're sending incomplete information");

        const activity = await setActivityInDB(name.trim(), difficult, duration, season, country);
        res.send({msg: 'The activity has been created successfully'});
    }
    catch(error)
    {
        next(error);
    }
});

activitiesRouter.get('/', async (req, res, next) =>
{
    try
    {
        const activities = await getActivities();
        res.send(activities);
    }
    catch(error)
    {
        next(error);
    }
})

module.exports = activitiesRouter;