const User = require('../models/users.model');
const bcrypt = require('bcryptjs');

exports.get_signup = (request, response, next) => {
    response.render('signup', {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
    });
};

exports.post_signup = (request, response, next) => {
    
    const newUser = new User({
        username: request.body.inputUsername,
        password: request.body.inputPassword,
    });

    newUser.save()
    .then(([rows, fieldData]) => {
        
        request.session.alert = "Usuario registrado.";

        response.redirect('/users/login');
    })
    .catch((error) => console.log(error));
};

exports.get_login = (request, response, next) => {

    let alert = '';

    if (request.session.alert != '') {
        alert = request.session.alert;
        request.session.alert = '';
    }

    response.render('login', {
        alert: alert,
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
    });
};

exports.post_login = (request, response, next) => {
    User.fetchOne(request.body.inputUsername)
    .then(([rows, fieldData]) => {
        if (rows.length > 0) {
            bcrypt.compare(request.body.iputPassword, rows[0].password)
            .then((doMatch) => {
                if (doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.username = rows[0].username;
                    response.redirect('/list');
                } else {
                    request.session.alert = 'El usuario y/o contraseña no coinciden';
                    response.redirect('/login');
                }
            })
            .catch((error) => {console.log(error)});
        } else {
            request.session.alert = 'El usuario y/o contraseña no coinciden';
            response.redirect('/login');
        }
    })
    .catch((error) => {console.log(error)});
}

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};