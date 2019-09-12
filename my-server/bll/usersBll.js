var UsersDal = require('../dal/usersDal');
var usersDal=UsersDal();
var usersFields='_id name email date';
module.exports = {
    /**
     * 通过Id获取用户信息
     */
    getById: async (id) => {
        var res=await usersDal.get({_id:id});
        return res;
    },
    /**
     * 通过用户名获取用户信息
     */
    getByName:async(name)=>{
        var res=await usersDal.get({name:name});
        return res;
    },
    /**
     * 通过邮箱获取用户信息
     */
    getByEmail:async(email)=>{
        var res=await usersDal.get({email:email});
        return res;
    },
    /**
     * 通过名字查询列表
     */
    getList:async()=>{
        var res=await usersDal.getList({},usersFields);
        return res;
    },
    /**
     * 通过Id数组获取用户列表
     */
    getListByIds:async(ids)=>{
        var res=await usersDal.getList({_id:{$in:ids}},usersFields);
        return res;
    },
    /**
     * 添加一个user
     */
    add:async(user)=>{
        var res=await usersDal.add(user);
        return res;
    }
};