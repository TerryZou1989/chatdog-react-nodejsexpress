var TokensDal = require('../dal/tokensDal');
var tokensDal=TokensDal();
module.exports = {
    /**
     * 通过token获取token数据
     */
    getByToken: async (token) => {
        var res=await tokensDal.get({token:token});
        return res;
    },
    /**
     * 通过用户id获取数据
     */
    getByUserId:async(userId)=>{
        var res=await tokensDal.get({userId:userId});
        return res;
    },
    /**
     * 添加一个token
     */
    add:async(token)=>{
        var res=await tokensDal.add(token);
        return res;
    },

    /**
     * 通过用户id更新用户的token
     */
    updateToken:async(userId,token)=>{
        var res=await tokensDal.update({userId:userId},{token:token});
        return res;
    }
};