var FriendsDal = require('../dal/friendsDal');
var friendsDal=FriendsDal();

module.exports = {

    /**
     * 通过用户Id获取列表
     */
    getList:async(userId)=>{
        var res=await friendsDal.getList({userId:userId});
        return res;
    },
    /**
     * 通过用户Id和好友Id获取对象
     */
    getByFriend:async(userId,friendId)=>{
        var res=await friendsDal.get({userId:userId,friendId:friendId});
        return res;
    },
    /**
     * 添加一个好友
     */
    add:async(friend)=>{
        var res=await friendsDal.add(friend);
        return res;
    }
};