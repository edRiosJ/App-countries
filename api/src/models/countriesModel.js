const { DataTypes } = require('sequelize');

//* Modelo terminado
module.exports = (sequelize) =>
{
  sequelize.define('countries',
  {
    id:
    {
      type: DataTypes.STRING,
      primaryKey: true,
      validate:
      {
        len:
        {
          args: [3,3],
          msg: "The id must has length of 3 characters"
        },
        isAlpha: {msg: "The id must be only alphabet characters"},
      }
    },
    name:
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:
      {
        notEmpty: {msg: "The name can't be empty"},
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
    imageFlag:
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:
      {
        isUrl: {msg: "The flag must be an URL valid"},
        is:
        {
          args: /^(.*?)\.(png|svg)+$/i,
          msg: "Extension not valid"
        }
      }
    },
    continent:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        isIn:
        {
          args: [['Americas','Europe','Asia','Africa','Oceania', 'Antarctic']],
          msg: "Continent not valid"
        }
      }
    },
    capital:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        notEmpty: {msg: "The capital can't be empty"},
        containsNumber(value)
        {
          for(let i=0;i<value.length;i++)
          {
            if(value[i] === ' ') continue;
            if(!isNaN(value[i])) throw new Error("The capital doesn't has numbers");
          }
        }
      }
    },
    subregion:
    {
      type: DataTypes.STRING,
      validate:
      {
        notEmpty: {msg: "The subregion can't be empty"},
        containsNumber(value)
        {
          for(let i=0;i<value.length;i++)
          {
            if(value[i] === ' ') continue;
            if(!isNaN(value[i])) throw new Error("The subregion doesn't has numbers");
          }
        }
      }
    },
    area:
    {
      type: DataTypes.FLOAT,
      validate:
      {
        isFloat: {msg: "The area must be a number"},
        isAreaPositive(value)
        {
          if(value <= 0) throw new Error("The area's number is not valid");
        }
      }
    },
    population:
    {
      type: DataTypes.INTEGER,
      validate:
      {
        isInt: {msg: "The population must be a number"},
        isPopulationPositive(value)
        {
          if(value <= 0) throw new Error("The population's number is not valid");
        }
      }
    }
  },
  {
    timestamps: false
  });
};
