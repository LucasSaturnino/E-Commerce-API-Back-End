const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Rotas públicas
router.post('/user', userController.createUser);
router.post('/user/token', authController.generateToken);
router.get('/user/:id', userController.getUserById);

module.exports = router;