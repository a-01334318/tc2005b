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

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
};