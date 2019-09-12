var MessagesDal = require('../dal/messagesDal');
var messagesDal = MessagesDal();
module.exports = {

    /**
     * 通过1对1获取聊天记录
     */
    getListBySingleChat: async (userId, toUserId) => {
        var res = await messagesDal.getList({
            $or: [
                { $and: [{ userId: userId }, { toUserId: toUserId }] },
                { $and: [{ userId: toUserId }, { toUserId: userId }] }
            ]
        });
        return res;
    },
    /**
     * 添加一个message
     */
    add: async (message) => {
        var res = await messagesDal.add(message);
        return res;
    },
};