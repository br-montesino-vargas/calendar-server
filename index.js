const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const { db } = require('./database/config');

// Crear servidor de express
const app = express();

// Base de datos
db();

// CORS
app.use( cors() );

// Directorio público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas

app.use('/api/auth', require('./routes/auth') );
app.use('/api/calendar', require('./routes/calendar') );

/** Para cualquier otra petición */
app.get('*', ( req, res ) =>
{
    res.sendFile( path.join( __dirname+'/public/index.html' ) );
});


// Escuchar peticiones
app.listen( process.env.PORT, () =>
{
	console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});