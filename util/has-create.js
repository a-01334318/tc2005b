module.exports = (request, response, next) => {
    if (!(request.session.privilegios.indexOf('create') >= 0)) {
        return response.redirect('/list');
    }
    next();
}