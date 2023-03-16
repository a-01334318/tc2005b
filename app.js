const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const isAuth = require('./util/is-auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.use((request, response, next) => {
    next(); // Le permite a la petición avanzar hacia el siguiente middleware
});

const usersRoutes = require('./routes/users.routes');
app.use('/users', usersRoutes);

const myRoutes = require('./routes/lab.routes.js');
app.use('/', myRoutes);
// Para proteger una ruta, se puede usar el middleware isAuth
app.use('/list', isAuth, myRoutes);

app.use((request, response, next) => {
    response.status(404);
    response.send("404 - Page not found");
});

app.listen(3000);