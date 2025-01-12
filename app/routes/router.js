const express = require('express');
const router = express.Router();

const controller = require('../controller/controller.js');
const middleware = require('../middleware/middleware.js');

// pages
router.get('/', controller.enter);
router.get('/home', controller.home)

// routes
router.post('/login', controller.login);
router.post('/register', middleware.hasKey, controller.registerUserManager); // register user stock manager

module.exports = router;