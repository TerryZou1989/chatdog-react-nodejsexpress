var express = require('express');
var router = express.Router();
var usersC=require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersC.getList);

router.get('/user/:id', usersC.get);

router.get('/get_friends', usersC.getFriends);

router.post('/add_friend', usersC.addFriend);

module.exports = router;