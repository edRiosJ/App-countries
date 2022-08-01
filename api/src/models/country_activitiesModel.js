const { DataTypes } = require('sequelize');
const {countries} = require('./countriesModel');
const {activities} = require('./activitiesModel');

module.exports = (sequelize) =>
{
    sequelize.define('country_activities',
    {
        countryId:
        {
            type: DataTypes.INTEGER,
            references:
            {
            model: countries,
            key: 'id'
            }
        },
        activityId:
        {
            type: DataTypes.INTEGER,
            references:
            {
            model: activities,
            key: 'id'
            }
        }
    },
    {
        timestamps: false
    });
}