const express = require('express');
const router = express.Router();
//---user model

const authController = require('./authController')

router.post('/register', authController.register)

router.post('/login', authController.login)

module.exports = router;