const express = require('express');
const router = express.Router();

const controller = require('../controller/controller.js');
const middleware = require('../middleware/middleware.js');


// routes
router.post('/login', middleware.checkFields, controller.login,  middleware.checkBearerToken);
router.get('/home', middleware.checkBearerToken, controller.home)
router.get('/user/account', middleware.checkBearerToken, controller.accountUser)

// router.post('/register', middleware.checkFields, middleware.hasKey, controller.registerUserManager, ); // register user stock private

module.exports = router;