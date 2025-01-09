const express = require('express');
const router = express.Router();

const controller = require('../controller/controller.js');

router.get('/', controller.enter);
router.post('/home', controller.home);

module.exports = router;