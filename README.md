# 🌎 App Countries

<p align="left">
  <img height="200" src="./countries.png" />
</p>

## 🔶 Acerca del proyecto

Esta aplicación web consta de realizar peticiones a una API y a una base de datos para mostrar todos los países.

Se puede acceder a la información detallada de cada país.

Se puede realizar la búsqueda de países por coincidencia de nombre, ordenar y filtrar.

Se puede crear actividades turísticas a través de un formulario para uno o mas países.

## 🔶 Ejecutando el proyecto

Para poder ejecutar el proyecto en tu localhost realiza los siguientes pasos.

📌 Para el Back-end:

1️⃣ Dentro de la carpeta "api" crear un archivo .env con los siguientes datos:

        DB_USER=usuariodepostgres

        DB_PASSWORD=passwordDePostgres

        DB_HOST=localhost

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.

Adicionalmente será necesario que creen desde psql una base de datos llamada `countries2`

2️⃣ Abrir una terminal y pararse sobre la carpeta "api"

3️⃣ Ejecutar el comando `npm install`

4️⃣ Para levantar el server ejecutar el comando `npm start`

📌 Para el Back-end:

1️⃣ Abrir una terminal y pararse sobre la carpeta "client"

2️⃣ Ejecutar el comando `npm install`

3️⃣ Para levantar el front ejecutar el comando `npm start`

## 🔶 Imagenes del proyecto

- Home pt1.

![Homept1](https://res.cloudinary.com/edrj/image/upload/v1661931220/app-countries/home_fegxxo.png)

- Home pt2.

![Homept2](https://res.cloudinary.com/edrj/image/upload/v1661931219/app-countries/home2_bxfjnr.png)

- Detalles del pais

![Detail](https://res.cloudinary.com/edrj/image/upload/v1661931219/app-countries/detail_fouvkp.png)

- Formulario

![Form](https://res.cloudinary.com/edrj/image/upload/v1661931220/app-countries/form_dpue73.png)

## 🔶 Tecnologías y herramientas utilizadas

- JavaScript
- React
- Redux
- React-Router
- React-Icons.
- Node.js
- Express.js
- Sequelize
- PostgreSQL
- Postman
- Cloudinary
- Git