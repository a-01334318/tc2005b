const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require('../controllers/lab.controller')

router.get('/', lab.get_index);
router.get('/contact', lab.get_contact);
router.get('/contact', lab.post_contact);
router.get('/list', lab.get_contacts);

module.exports = router;