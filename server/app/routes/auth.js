const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Change from GET to POST for signin
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

module.exports = router;