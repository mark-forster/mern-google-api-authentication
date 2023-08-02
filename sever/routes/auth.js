const userController= require('../controllers/user.js')
const express = require('express');
const router= express.Router();

router.post('/register', userController.register)

// active handles
router.get('/activate/:token', userController.activateHandle)


router.post('/login', userController.login)
router.post('/send-mail' , userController.sendotp)
module.exports =router;