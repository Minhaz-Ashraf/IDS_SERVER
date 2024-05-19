const express = require('express');
const router = express.Router();
const eventController = require('../controllers/registration');

// Route to handle user registration
router.post('/register/brands', eventController.BrandRegister);
router.post('/register/designers', eventController.designerRegister);
router.post('/register/models', eventController.modelRegister);
module.exports = router;
