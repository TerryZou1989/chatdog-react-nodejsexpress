const db = require('mongoose');

// model.js
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

// token模型
const tokensSchema = new Schema({
    userId: String, //用户id
    token: String, //token
    date: Number //创建时间
}, {
    versionKey: false
});

db.model('token', tokensSchema);