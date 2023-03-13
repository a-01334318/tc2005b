const { response } = require('express');
const Contact = require('../models/lab.model');

exports.get_index = (request, response, next) => {
    response.render('index');
};

exports.get_contact = (request, response, next) => {
    response.render('contact');
};

exports.post_contact = (request, response, next) => {
    const newContact = new Contact({
        name: request.body.name,
        id: request.body.id,
    });
    newContact.save();
    response.status(300).redirect('/list');
};

exports.get_list = (request, response, next) => {
    response.render('list', {
        contacts: Contact.fectchAll(),
    });
};