var usersBll = require('../bll/usersBll');
var friendsBll = require('../bll/friendsBll');
var messagesBll = require('../bll/messagesBll');
var util = require('../common/util');

module.exports = {


    /**
     * 添加一个消息记录
     */
    add: async (message) => {
        var userRes=await usersBll.getById(message.userId);
        if (!(userRes.result && userRes.data)) {
            return { result: false, message: 'user not exist' };
        }
        var toUserRes=await usersBll.getById(message.toUserId);
        if (!(toUserRes.result && toUserRes.data)) {
            return { result: false, message: 'toUser not exist' };
        }
        return await messagesBll.add(message);
    },

    /**
     * 查询1:1聊天记录
     */
    getListBySingleChat: async (userId,toUserId) => {
        var res = await messagesBll.getListBySingleChat(userId,toUserId);
        return res;
    }
};