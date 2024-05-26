const express = require('express');
const Auth = require('../controllers/auth.controller.js');

const router = express.Router();

router.post("/signup",Auth.signup);
router.post('/signin',Auth.signin);
router.post('/google',Auth.google);

module.exports = router;