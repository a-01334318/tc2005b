const express = require('express');
const app = express();

const misRutas = require('./routes/logic.routes');
app.use('/rutas', misRutas);

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.use('/home', (request, response, next) => {
    response.send('Bienvenido a casa!'); 
});

app.use((request, response, next) => {
    console.log('Otro middleware!');
    response.send('¡Hola mundo!'); //Manda la respuesta
});

app.listen(3000);