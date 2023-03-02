const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./DB/config');

// leemos el .env
require('dotenv').config()
// Mi servidor
const app = express();

//DB connection 
dbConnection();

// Directorio publico
app.use( express.static('public'))

// Usamos el cors
app.use(cors());
// usamos el json para obtener el body de las request
app.use( express.json() );
// Usamos las rutas del auth
app.use('/api/auth/v1/', require('./routes/auth'));



const puert = process.env.PORT;
app.listen(puert, (req, res) => {
    console.log(`Servidor corriendo en el puerto ${puert}`);
});
