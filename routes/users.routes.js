const express = require('express');
const path = require('path');

const router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/signup', usersController.get_signup);
router.get('/logout', usersController.logout);

module.exports = router;