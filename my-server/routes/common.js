var express = require('express');
var router = express.Router();
var usersC=require('../controllers/usersController');

router.post('/signin', usersC.signIn);
router.post('/signup', usersC.signUp);

module.exports = router;