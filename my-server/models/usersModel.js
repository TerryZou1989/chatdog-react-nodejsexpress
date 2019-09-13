const db = require('mongoose');

// model.js
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

// 用户模型
const usersSchema = new Schema({
    name: String, //用户名
    email: String, //邮箱
    password: String, //密码
    date: Number //创建时间
}, {
    versionKey: false
});

db.model('user', usersSchema);