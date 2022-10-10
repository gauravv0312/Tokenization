const express = require('express');
const router = express.Router();

const{homePage} = require('../controller/homeController');
const auth = require('../middelware/auth');

router.route('/').get(auth,homePage);

module.exports = router;