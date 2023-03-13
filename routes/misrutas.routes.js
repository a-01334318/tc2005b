const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (request, response, next) => {
    response.render('index');
});

router.get('/contact', (request, response, next) => {
    response.render('contact');
});

router.get('/faq', (request, response, next) => {
    response.render('faq');
});

module.exports = router;