var usersBll = require('../bll/usersBll');
var tokensBll = require('../bll/tokensBll');
var friendsBll = require('../bll/friendsBll');
var util = require('../common/util');

module.exports = {
    /**
     * 通过登录获取用户信息
     */
    getByLogin: async (email, password) => {
        var userRes = await usersBll.getByEmail(email);
        if (!userRes.result) {
            return userRes;
        }
        var user = userRes.data;
        if (!(user && user._id)) {
            return { result: false, message: 'user is not exist' };
        }
        //暂时不加密
        if (user.password != password) {
            return { result: false, message: 'password is wrong' };
        }
        delete user.password;
        var token ='Token '+util.guid() + Date.now();
        var tokenRes = await tokensBll.getByUserId(user._id);
        if (tokenRes.result && tokenRes.data && tokenRes.data._id) {
            tokensBll.updateToken(user._id, token);
        }
        else {
            tokensBll.add({ userId: user._id, token: token });
        }
        return { result: true, data: { user: user, token: token } };
    },

    /**
     * 添加一个用户
     */
    add: async (user) => {
        var nameRes = await usersBll.getByName(user.name);
        if (nameRes.result && nameRes.data) {
            return { result: false, message: 'name is exist' };
        }
        var emailRes = await usersBll.getByEmail(user.email);
        if (emailRes.result && emailRes.data) {
            return { result: false, message: 'email is exist' };
        }
        return await usersBll.add(user);
    },

    /**
     * 查询所有用户列表
     */
    getList: async () => {
        var res = await usersBll.getList();
        return res;
    },

    /**
     * 添加好友
     */
    addFriend: async (userId, friendId) => {

        if (userId == friendId) {
            return { result: false, message: 'userId same as friendId' };
        }

        var friendRes = await friendsBll.getByFriend(userId, friendId);
        if (friendRes.result && friendRes.data && friendRes.data._id) {
            return { result: false, message: 'Already friend' };
        }

        var userRes = await usersBll.getById(userId);
        if (!userRes.result) {
            return userRes;
        }

        var user = userRes.data;
        if (!(user && user._id)) {
            return { result: false, message: 'user not exist' };
        }

        var fuserRes = await usersBll.getById(friendId);
        if (!fuserRes.result) {
            return fuserRes;
        }

        var fuser = fuserRes.data;
        if (!(fuser && fuser._id)) {
            return { result: false, message: 'friend user not exist' };
        }

        var addRes = await friendsBll.add({ userId, friendId });

        return addRes;
    },

    /**
     * 获取好友列表
     */
    getFriends: async (userId) => {
        var userRes = await usersBll.getById(userId);
        if (!userRes.result) {
            return userRes;
        }
        var user = userRes.data;
        if (!(user && user._id)) {
            return { result: false, message: 'user not exist' };
        }

        delete user.password;

        var friendsRes = await friendsBll.getList(userId);
        if (!friendsRes.result) {
            return friendsRes;
        }
        var friends = friendsRes.data;
        if (!(friends || friends.length == 0)) {
            return {
                result: true, data: {
                    user: user,
                    friends: []
                }
            };
        }

        var friendIds = [];
        for (var i = 0; i < friends.length; i++) {
            friendIds.push(friends[i].friendId);
        }

        var friendUsersRes = await usersBll.getListByIds(friendIds);
        if (!friendUsersRes.result) {
            return friendUsersRes;
        }

        var list = friendUsersRes.data;
        return {
            result: true, data: {
                user: user,
                friends: list
            }
        };
    }
};