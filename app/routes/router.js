const express = require('express');
const router = express.Router();

const controller = require('../controller/controller.js');
const middleware = require('../middleware/middleware.js');


// routes
router.get('/home', middleware.checkBearerToken, controller.home)
router.post('/login', middleware.checkFields,  middleware.checkBearerToken, controller.login);

// router.post('/register', middleware.checkFields, middleware.hasKey, controller.registerUserManager, ); // register user stock private

module.exports = router;