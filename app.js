const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.use((request, response, next) => {
    next(); // Le permite a la petición avanzar hacia el siguiente middleware
});

const myRoutes = require('./routes/lab.routes.js');
app.use('/', myRoutes);

app.use((request, response, next) => {
    response.status(404);
    response.send("404 - Page not found");
});

app.listen(3000);