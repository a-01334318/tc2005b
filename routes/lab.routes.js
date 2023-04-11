const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require('../controllers/lab.controller')
const hasCreate = require('../util/has-create');

router.get('/', controller.get_index);
router.get('/contact', hasCreate, controller.get_contact);
router.post('/contact', hasCreate, controller.post_contact);
router.get('/buscar/:valor_busqueda', controller.get_buscar);
router.get('/list', controller.get_list);
router.get('/list/:id', controller.get_list);
router.get('/faq', controller.get_faq);

module.exports = router;