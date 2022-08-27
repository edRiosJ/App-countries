require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

let sequelize = process.env.NODE_ENV === "production" ? new Sequelize(
  {
    database: process.env.DB_NAME,
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool:
    {
      max: 3,
      min: 1,
      idle: 10000
    },
    dialectOptions:
    {
      ssl:
      {
        require: true,
        rejectUnauthorized: false
      },
      keepAlive: true
    },
    ssl: true
  })
  : new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/countries2`,
  {
    logging: false,
    native: false
  });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) =>
  {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Countries, Activities, Country_activities} = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Countries.belongsToMany(Activities, {through: Country_activities});
Activities.belongsToMany(Countries, {through: Country_activities});

module.exports =
{
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op
};
