const { DataTypes } = require('sequelize');

//* Modelo terminado
module.exports = (sequelize) =>
{
  sequelize.define('activities',
  {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:
      {
        notEmpty: {msg: "The name can't be empty"},
        len:
        {
          args: [3,20],
          msg: "The name must has length between 3 and 20 characters"
        },
        containsNumber(value)
        {
          for(let i=0;i<value.length;i++)
          {
            if(value[i] === ' ') continue;
            if(!isNaN(value[i])) throw new Error("The name doesn't has numbers");
          }
        }
      }
    },
    difficult:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:
        {
            isInt: {msg: "The difficult must be a number"},
            min:
            {
              args: 1,
              msg: "The difficult mus be a number between 1 and 5"
            },
            max:
            {
              args: 5,
              msg: "The difficult mus be a number between 1 and 5"
            }
        },
        get()
        {
            let value = this.getDataValue('difficult');
            let diff = value === 1 ? 'so easy':
            (
                value === 2 ? 'easy':
                (
                    value === 3 ? 'normal':
                    (
                        value === 4 ? 'hard' : 'so hard'
                    )
                )
            );
            return diff;
        }
    },
    duration:
    {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate:
        {
            isFloat: {msg: "The duration must has the next format: 'hrs'.'min'"},
            validateDuration(value)
            {
                let hours = Math.trunc(value);
                let minutes = hours === 0 ? value * 100 : (value % hours) * 100;
                if(hours > 8 || (minutes === 0 && hours <= 0)) throw new Error('The amount of hours is not valid');
                if(minutes < 0 || minutes > 59) throw new Error('The amount of minutes is not valid');
            }
        },
        get()
        {
            let hours = Math.trunc(this.getDataValue('duration'));
            let minutes = (this.getDataValue('duration') % hours).toFixed(2) * 100;
            return `${hours}:${minutes} hrs.`;
        }
    },
    season:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        isIn:
        {
          args: [['Winter', 'Spring', 'Summer', 'Autumn']],
          msg: "Season not valid"
        }
      }
    }
  },
  {
    timestamps: false
  });
};