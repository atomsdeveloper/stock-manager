const express = require('express');
const router = express.Router();

const controller = require('../controller/controller.js');

// pages
router.get('/', controller.enter);
router.get('/home', controller.home)

// routes
router.post('/login', controller.login);

module.exports = router;