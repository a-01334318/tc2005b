const express = require('express');

const router = express.Router();

router.get('/', (request, response, next) => {

    let aboutme = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>About me</h1>
                    <p>Hola! Soy Erik y estudio ITC</p>
            </body>
        </html>
    `;

    response.send(aboutme);
});


module.exports = router;