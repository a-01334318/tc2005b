const { response } = require('express');
const Contact = require('../models/contacts.model');

exports.get_index = (request, response, next) => {
    response.render('index');
};

exports.get_contact = (request, response, next) => {
    response.render('contact', {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
    });
};

exports.post_contact = (request, response, next) => {
    const newContact = new Contact({
        name: request.body.inputName,
        enrollment_id: request.body.inputId,
    });
    newContact.save()
    .then(([rows, fieldData]) => {
        request.session.lastContact = newContact.name;
        response.status(300).redirect('list');
    })
    .catch(error => console.log(error));
};

exports.get_list = (request, response, next) => {

    const cookies = request.get('Cookie') || '';

    let queries = cookies.split('=')[1] || 0;

    queries++;

    //Crear una cookie
    response.setHeader('Set-Cookie', 'consultas=' + queries + '; HttpOnly');

    const id = request.params.id || 0;

    Contact.fetch(id)
    .then(([rows, fieldData]) => {
        console.log(rows);
        //console.log(fieldData);
            
        response.render('list', { 
            contacts: rows,
            lastContact: request.session.lastContact || '',
            isLoggedIn: request.session.isLoggedIn || false,
            username: request.session.username || '',
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.get_faq = (request, response, next) => {
    response.render('faq');
};