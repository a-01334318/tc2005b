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
            bcrypt.compare(request.body.inputPassword, rows[0].password)
            .then((doMatch) => {
                if (doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.username = rows[0].username;
                    User.getPrivileges(rows[0].username)
                    .then(([consulta_privilegios, fieldData]) => {
                        console.log(consulta_privilegios);

                        const privilegios = [];

                        for (let privilegio of consulta_privilegios) {
                            privilegios.push(privilegio.nombre);
                        }

                        console.log(privilegios);

                        request.session.privilegios = privilegios;

                        return request.session.save(err => {
                            response.redirect('/list');
                        });
                    })
                    .catch((error) => {console.log(error)});
                } else {
                    request.session.alert = 'El usuario y/o contraseña no coinciden';
                    response.redirect('/users/login');
                }
            })
            .catch((error) => {console.log(error)});
        } else {
            request.session.alert = 'El usuario y/o contraseña no coinciden';
            response.redirect('/users/login');
        }
    })
    .catch((error) => {console.log(error)});
}

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};