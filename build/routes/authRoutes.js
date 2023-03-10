"use strict";
const { Router } = require('express');
const authController = require('../controllers/authControllers');
const router = Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
module.exports = router; //can not change it for export because it will throw an error
