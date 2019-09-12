 var config=require('./config');

 const db = require('mongoose');
 
 module.exports = () => {
   var url = config.mongodb;
    db.connect(url,{ useNewUrlParser: true });

    db.connection.on('error', function (error) {
        console.log('db connect error:' + error);
    });

    db.connection.on("open", function () {
        console.log("db open");
    })

    db.connection.on('disconnected', function () {
        console.log('db disconnected');
    })
    require('../models/usersModel');
    require('../models/tokensModel');
    require('../models/friendsModel');
    require('../models/messagesModel');

    return db;
};
