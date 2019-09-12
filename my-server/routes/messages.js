var express = require('express');
var router = express.Router();
var messagesC=require('../controllers/messagesController');

/* GET users listing. */
router.get('/get_singlechat', messagesC.getListBySingleChat);

router.post('/', messagesC.add);

module.exports = router;