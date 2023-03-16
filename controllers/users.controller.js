const User = require('../models/users.model');

exports.get_signup = (request, response, next) => {
    response.render('signup');
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
    });
};

exports.post_login = (request, response, next) => {
    User.fetchOne(request.body.inputUsername)
    .then(([rows, fieldData]) => {
        if (rows.length > 0) {

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