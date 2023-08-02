const userController= require('../controllers/user.js')
const express = require('express');
const router= express.Router();

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/send-otp' , userController.sendotp)
module.exports =router;