const { response } = require('express');
const Contact = require('../models/contacts.model');

exports.get_index = (request, response, next) => {
    response.render('index');
};

exports.get_contact = (request, response, next) => {
    response.render('contact');
};

exports.post_contact = (request, response, next) => {
    const newContact = new Contact({
        name: request.body.inputName,
        id: request.body.inputId,
    });
    newContact.save();
    // Utilizar variable de sesión en controlador
    request.session.lastContact = newContact.name;
    response.status(300).redirect('list');
};

exports.get_list = (request, response, next) => {

    const cookies = request.get('Cookie') || '';

    let queries = cookies.split('=')[1] || 0;

    queries++;

    //Crear una cookie
    response.setHeader('Set-Cookie', 'consultas=' + queries + '; HttpOnly');

    Contact.fetchAll()
    .then(([rows, fieldData]) => {
        console.log(rows);
        //console.log(fieldData);
        
        response.render('list', { 
            contacts: rows,
            lastContact: request.session.lastContact || '',
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.get_faq = (request, response, next) => {
    response.render('faq');
};