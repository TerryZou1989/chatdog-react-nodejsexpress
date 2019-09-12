const db = require('mongoose');

// model.js
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

// 友好模型
const friendsSchema = new Schema({
    userId: String, //用户Id
    friendId: String, //用户Id，好友的
    date: Number //创建时间
}, {
    versionKey: false
});

db.model('friend', friendsSchema);