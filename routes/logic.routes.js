const express = require('express');

const router = express.Router();

router.get('/ruta', (request, response, next) => {
    response.send('Respuesta de la ruta "/rutas/ruta"'); 
});

module.exports = router;