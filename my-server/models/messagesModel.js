const db = require('mongoose');

// model.js
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

// 消息模型
const messagesSchema = new Schema({
    userId: String, //用户Id
    toUserId: String, //对方用户Id
    message: String, //消息
    date: Number //创建时间
}, {
    versionKey: false
});

db.model('message', messagesSchema);